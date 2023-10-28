package com.elec5619.backend.review;

import com.elec5619.backend.user.UserService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<Review>> getReviews (@RequestParam Long rawgId)
    {
        List<Review> reviews = reviewService.getReviewsOfGame(rawgId);

        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody ReviewRequest request){
        Review review = reviewService.addReview(request);

        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Long reviewId, @RequestBody ReviewRequest request){
        Review review = reviewService.updateReview(reviewId, request);

        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteReviews(@RequestParam Long gameId) {
       reviewService.deleteReviewsOfGame(gameId);

       return new ResponseEntity<>(HttpStatus.OK);
    }


}
