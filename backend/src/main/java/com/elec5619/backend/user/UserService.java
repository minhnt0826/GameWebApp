package com.elec5619.backend.user;

import com.elec5619.backend.game.Game;
import com.elec5619.backend.game.GameRepository;
import com.elec5619.backend.user.User;
import com.elec5619.backend.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    public List<User> getAllUsers(){
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);
        return users;
    }

    public User register(User user) {
        return userRepository.save(user);
    }

    public Long login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user.getId();
        }
        return null;
    }

    public List<Game> getBookmarks(long userId)
    {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException());

        List<Game> games = new ArrayList<>();
        games.addAll(user.getBookmarkedGames());

        for (Game game: games) {
            System.out.println(game.getName());
        }

        return games;
    }

    private Game addGame(Long rawgId, String name){
        Game game = new Game();
        game.setRawgId(rawgId);
        game.setName(name);

        gameRepository.save(game);

        System.out.println("Adding new game");
        return game;
    }

    public void addBookmark(Long userId, Long rawgId, String name) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException());

        Game game = gameRepository.findByRawgId(rawgId);

        if (game == null ){
            game = addGame(rawgId, name);
        }

        user.addBookmark(game);
        userRepository.save(user);
    }

}
