package com.elec5619.backend;

import com.elec5619.backend.user.UserService;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeAll
    public void setUp()
    {
        userService.deleteAllUsers();
    }

    @AfterAll
    public void clean()
    {
        userService.deleteAllUsers();
    }

    @Test
    public void testRegisterAndLogin() throws Exception {
        // Payload
        Map<String, String> payload = new HashMap<>();
        payload.put("username", "minhntz");
        payload.put("email", "minhnt0826@gmail.com");
        payload.put("firstName", "Thanh");
        payload.put("lastName", "Nguyen");
        payload.put("password", "minhnt123");

        mockMvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("minhntz"))
                .andExpect(jsonPath("$.email").value("minhnt0826@gmail.com"))
                .andExpect(jsonPath("$.firstName").value("Thanh"))
                .andExpect(jsonPath("$.lastName").value("Nguyen"));

        // Payload
        Map<String, String> payload2 = new HashMap<>();
        payload2.put("username", "minhntz");
        payload2.put("password", "minhnt123");

        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload2)))
                .andExpect(status().isOk());
    }
}
