package com.gamelibrary.GameWebLibrary.repository;

import com.gamelibrary.GameWebLibrary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
