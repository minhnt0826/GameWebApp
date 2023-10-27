package com.gamelibrary.GameWebLibrary.repository;

import com.gamelibrary.GameWebLibrary.model.SavedGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedGameRepository extends JpaRepository<SavedGame, Long> {
}
