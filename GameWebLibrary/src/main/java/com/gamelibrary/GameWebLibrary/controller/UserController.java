package com.gamelibrary.GameWebLibrary.controller;

import com.gamelibrary.GameWebLibrary.model.User;
import com.gamelibrary.GameWebLibrary.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //build create employee REST API
    @PostMapping()
    public ResponseEntity<User> saveUser(@RequestBody User user){
        return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
