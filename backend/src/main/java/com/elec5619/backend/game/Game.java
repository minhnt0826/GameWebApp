package com.elec5619.backend.game;

import com.elec5619.backend.guide.Guide;
import com.elec5619.backend.review.Review;
import com.elec5619.backend.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Game", schema = "public")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private Long rawgId;

    private String name;

    @ManyToMany(mappedBy = "bookmarkedGames")
    @JsonIgnore
    private Set<User> bookmarks = new HashSet<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Guide> guides = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRawgId() {
        return rawgId;
    }

    public void setRawgId(Long rawgId) {
        this.rawgId = rawgId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Set<User> getBookmarks() {
        return bookmarks;
    }

    public void setBookmarks(Set<User> bookmarks) {
        this.bookmarks = bookmarks;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    public Set<Guide> getGuides() {
        return guides;
    }

    public void setGuides(Set<Guide> guides) {
        this.guides = guides;
    }

    @PreRemove
    public void clearBookmarks(){
        bookmarks.clear();
    }
}


