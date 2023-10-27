package com.gamelibrary.GameWebLibrary.repository;

import com.gamelibrary.GameWebLibrary.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
