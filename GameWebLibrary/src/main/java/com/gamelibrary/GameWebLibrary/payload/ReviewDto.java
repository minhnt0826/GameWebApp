package com.gamelibrary.GameWebLibrary.payload;

import com.gamelibrary.GameWebLibrary.model.User;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

public class ReviewDto {
    private Long id;
    private Integer rating;
    private String text;
    private LocalDateTime date;
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
