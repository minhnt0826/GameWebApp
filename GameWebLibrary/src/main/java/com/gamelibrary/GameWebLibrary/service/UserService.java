package com.gamelibrary.GameWebLibrary.service;

import com.gamelibrary.GameWebLibrary.model.User;
import com.gamelibrary.GameWebLibrary.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository){
        super();
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
