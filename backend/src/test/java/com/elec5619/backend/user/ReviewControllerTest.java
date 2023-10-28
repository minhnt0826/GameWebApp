package com.elec5619.backend.user;

import com.elec5619.backend.game.Game;
import com.elec5619.backend.game.GameRepository;
import com.elec5619.backend.game.GameService;
import com.elec5619.backend.review.Review;
import com.elec5619.backend.review.ReviewRepository;
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
public class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeAll
    public void setUp() throws Exception
    {
        reviewRepository.deleteAll();
        userRepository.deleteAll();
        gameRepository.deleteAll();
    }

    @AfterAll
    public void clean() throws Exception{
        reviewRepository.deleteAll();
        userRepository.deleteAll();
        gameRepository.deleteAll();
    }

    @Test
    public void testAddAndModifyReview() throws Exception {
        // create game
        Map<String, Object> payload = new HashMap<>();
        payload.put("name", "The Witcher 3");
        payload.put("rawgId", 3328);

        mockMvc.perform(post("/api/games")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)));

        // create user
        Map<String, String> payload2 = new HashMap<>();
        payload2.put("username", "minhntz");
        payload2.put("email", "minhnt0826@gmail.com");
        payload2.put("firstName", "Thanh");
        payload2.put("lastName", "Nguyen");
        payload2.put("password", "minhnt123");

        mockMvc.perform(post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload2))).andReturn();

        MvcResult mvcResult1 = mockMvc.perform(post("/api/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload2))).andReturn();

        String jsonResponseBody1 = mvcResult1.getResponse().getContentAsString();

        Map<String, Integer> mapFromResponse = objectMapper.readValue(jsonResponseBody1, new TypeReference<Map<String, Integer>>() {});

        int userId = mapFromResponse.get("id");

        // Test creating review
        Map<String, Object> payload3 = new HashMap<>();
        payload3.put("userId", userId);
        payload3.put("text", "Game is amazing!");
        payload3.put("rawgId", 3328);
        payload3.put("rating", 4);

        mockMvc.perform(post("/api/reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload3))).andExpect(status().isCreated());

        // Test getting reviews
        MvcResult mvcResult2 =  mockMvc.perform(get("/api/reviews?rawgId=3328")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(payload3))).andReturn();

        String jsonResponseBody2 = mvcResult2.getResponse().getContentAsString();

        List<Review> reviewsFromResponses = objectMapper.readValue(
                jsonResponseBody2,
                new TypeReference<List<Review>>() {}
        );

        assert reviewsFromResponses.size() == 1;
        assert reviewsFromResponses.get(0).getText().equals("Game is amazing!");
        assert reviewsFromResponses.get(0).getRating() == 4;
        assert reviewsFromResponses.get(0).getUser().getUsername().equals("minhntz");

    }
}
