package com.gamelibrary.GameWebLibrary.repository;

import com.gamelibrary.GameWebLibrary.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
