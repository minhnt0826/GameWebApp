package com.elec5619.backend.game;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/games")
public class GameController {
    @Autowired
    private GameService gameService;

    @GetMapping
    public ResponseEntity<List<Game>> getGames() {
        List<Game> games = gameService.getAllGames();

        return new ResponseEntity<>(games, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Game> addGame(@RequestBody GameRequest request)
    {
        Game game = gameService.addGame(request);

        return new ResponseEntity<>(game, HttpStatus.OK);
    }
}
