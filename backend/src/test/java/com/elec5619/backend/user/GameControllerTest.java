package com.elec5619.backend.user;

import com.elec5619.backend.game.Game;
import com.elec5619.backend.game.GameRepository;
import com.elec5619.backend.game.GameService;
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
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class GameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeAll
    public void setUp()
    {
        gameRepository.deleteAll();
    }

    @AfterAll
    public void clean()
    {
        gameRepository.deleteAll();
    }

    @Test
    public void testAddGame() throws Exception {
        // Payload
        Map<String, Object> payload = new HashMap<>();
        payload.put("name", "The Witcher 3");
        payload.put("rawgId", 3328);

        mockMvc.perform(post("/api/games")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("The Witcher 3"))
                .andExpect(jsonPath("$.rawgId").value(3328));

        Map<String, Object> payload2 = new HashMap<>();
        payload2.put("name", "GTA 5");
        payload2.put("rawgId", 3420);

        mockMvc.perform(post("/api/games")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload2)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("GTA 5"))
                .andExpect(jsonPath("$.rawgId").value(3420));


        MvcResult mvcResult = mockMvc.perform(get("/api/games")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                        .andExpect(status().isOk())
                        .andReturn();

        String jsonResponseBody = mvcResult.getResponse().getContentAsString();

        List<Game> usersFromResponse = objectMapper.readValue(
                jsonResponseBody,
                new TypeReference<List<Game>>() {}
        );

        assert usersFromResponse.size() == 2;

        assert usersFromResponse.get(0).getName().equals("The Witcher 3");
        assert usersFromResponse.get(1).getName().equals("GTA 5");
    }
}
