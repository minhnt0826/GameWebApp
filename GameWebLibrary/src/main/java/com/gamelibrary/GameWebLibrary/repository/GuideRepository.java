package com.gamelibrary.GameWebLibrary.repository;

import com.gamelibrary.GameWebLibrary.model.Guide;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuideRepository extends JpaRepository<Guide, Long> {
}
