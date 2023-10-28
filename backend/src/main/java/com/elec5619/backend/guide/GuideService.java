package com.elec5619.backend.guide;

import com.elec5619.backend.game.Game;
import com.elec5619.backend.game.GameRepository;
import com.elec5619.backend.user.User;
import com.elec5619.backend.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuideService {

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    public Guide addGuide(GuideRequest request){
        Guide guide = new Guide();

        Game game = gameRepository.findById(request.getGameId()).orElseThrow(() -> new EntityNotFoundException());
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new EntityNotFoundException());

        guide.setGame(game);
        guide.setUser(user);
        guide.setText(request.getText());
        guide.setTitle(request.getTitle());

        guideRepository.save(guide);

        return guide;
    }

    public List<Guide> getGuidesOfGame (Long gameId){
        return guideRepository.findAllByGameId(gameId);
    }

    public void deleteReviewsOfGame (Long gameId){
        List<Guide> reviews = guideRepository.findAllByGameId(gameId);
        guideRepository.deleteAll(reviews);
    }

}
