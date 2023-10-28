package com.elec5619.backend.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {
    @Autowired
    private GameRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    public List<Game> getAllGames(){
        List<Game> games = new ArrayList<>();

        gameRepository.findAll().forEach(games::add);
        return games;
    }

    public Game addGame(GameRequest gameRequest) {
        Game gameFind = gameRepository.findByRawgId(gameRequest.getRawgId());

        if (gameFind == null)
        {
            Game game = new Game();

            game.setName(gameRequest.getName());
            game.setRawgId(gameRequest.getRawgId());

            return gameRepository.save(game);
        }
        else
        {
            return gameFind;
        }

    }

}
