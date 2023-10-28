package com.elec5619.backend.user;

import com.elec5619.backend.game.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAllUsers();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User registeredUser = userService.register(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Long>> login(@RequestBody User user) {
        Long userId = userService.login(user.getUsername(), user.getPassword());
        if (userId != null) {
            Map<String, Long> response = new HashMap<>();
            response.put("id", userId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long userId)
    {
        return new ResponseEntity<>(userService.getUserDetail(userId), HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUserProfile(@PathVariable Long userId, @RequestBody User user)
    {
        return new ResponseEntity<>(userService.updateUserProfile(userId, user), HttpStatus.OK);
    }


    @GetMapping("/{userId}/bookmarks")
    public ResponseEntity<List<Game>> getUserBookmarks(@PathVariable Long userId)
    {
        return new ResponseEntity<>(userService.getBookmarks(userId), HttpStatus.OK);
    }

    @PostMapping("/{userId}/bookmarks")
    public ResponseEntity<String> bookmarkGame(@PathVariable Long userId, @RequestBody BookmarkRequest request)
    {
        userService.addBookmark(userId, request.getRawgId(), request.getName());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/bookmarks")
    public ResponseEntity<String> deleteBookmark(@PathVariable Long userId, @RequestBody BookmarkRequest request)
    {
        userService.removeBookmark(userId, request.getRawgId());

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
