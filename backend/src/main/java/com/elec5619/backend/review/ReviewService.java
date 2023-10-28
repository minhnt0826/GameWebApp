package com.elec5619.backend.review;

import com.elec5619.backend.game.Game;
import com.elec5619.backend.game.GameRepository;
import com.elec5619.backend.user.User;
import com.elec5619.backend.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        Game game = gameRepository.findById(request.getGameId()).orElseThrow(() -> new EntityNotFoundException());
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new EntityNotFoundException());

        review.setGame(game);
        review.setUser(user);
        review.setText(request.getText());
        review.setRating(request.getRating());

        reviewRepository.save(review);

        return review;
    }

    public List<Review> getReviewsOfGame (Long gameId){
        return reviewRepository.findAllByGameId(gameId);
    }

    public void deleteReviewsOfGame (Long gameId){
        List<Review> reviews = reviewRepository.findAllByGameId(gameId);
        reviewRepository.deleteAll(reviews);
    }

}
