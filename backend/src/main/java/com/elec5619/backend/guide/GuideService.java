package com.elec5619.backend.guide;

import com.elec5619.backend.game.Game;
import com.elec5619.backend.game.GameRepository;
import com.elec5619.backend.review.Review;
import com.elec5619.backend.user.User;
import com.elec5619.backend.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

        Game game = gameRepository.findByRawgId(request.getRawgId());

        if (game == null)
        {
            throw new EntityNotFoundException();
        }

        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new EntityNotFoundException());

        guide.setGame(game);
        guide.setUser(user);
        guide.setText(request.getText());
        guide.setTitle(request.getTitle());

        guideRepository.save(guide);

        return guide;
    }

    public List<Guide> getGuidesOfGame (Long rawgId){
        List<Guide> guides = new ArrayList<>();

        Game game = gameRepository.findByRawgId(rawgId);
        if (game != null)
        {
            guides.addAll(game.getGuides());
        }

        return guides;
    }

    public List<Guide> getGuidesOfUser (Long userId){
        List<Guide> guides = new ArrayList<>();

        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException());

        guides.addAll(user.getGuides());

        return guides;
    }

    public void deleteGuidesOfGame (Long rawgId){
        List<Guide> guides = new ArrayList<>();

        Game game = gameRepository.findByRawgId(rawgId);
        if (game != null)
        {
            guides.addAll(game.getGuides());
        }

        guideRepository.deleteAll(guides);
    }

    public void deleteGuide (Long id){
        guideRepository.deleteById(id);
    }

}
