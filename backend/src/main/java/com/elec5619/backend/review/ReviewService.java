package com.elec5619.backend.review;

import com.elec5619.backend.game.Game;
import com.elec5619.backend.game.GameRepository;
import com.elec5619.backend.user.User;
import com.elec5619.backend.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    public Review addReview(ReviewRequest request){
        Review review = new Review();

        Game game = gameRepository.findByRawgId(request.getRawgId());

        if (game == null)
        {
            throw new EntityNotFoundException();
        }

        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new EntityNotFoundException());

        review.setGame(game);
        review.setUser(user);
        review.setText(request.getText());
        review.setRating(request.getRating());

        reviewRepository.save(review);

        return review;
    }

    public Review updateReview(Long reviewId, ReviewRequest updateRequest) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new EntityNotFoundException());

        if (updateRequest.getRating() != null) {
            review.setRating(updateRequest.getRating());
        }

        if (updateRequest.getText() != null) {
            review.setText(updateRequest.getText());
        }

        reviewRepository.save(review);

        return review;
    }

    public List<Review> getReviewsOfGame (Long rawgId){
        List<Review> reviews = new ArrayList<>();

        Game game = gameRepository.findByRawgId(rawgId);
        if (game != null)
        {
            reviews.addAll(game.getReviews());
        }

        return reviews;
    }

    public void deleteReviewsOfGame (Long rawgId){
        Game game = gameRepository.findByRawgId(rawgId);

        List<Review> reviews = new ArrayList<>();
        if (game != null)
        {
            reviews.addAll(game.getReviews());
        }

        reviewRepository.deleteAll(reviews);
    }

}
