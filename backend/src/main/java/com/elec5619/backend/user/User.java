package com.elec5619.backend.user;

import com.elec5619.backend.game.Game;
import com.elec5619.backend.review.Review;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="User", schema = "public")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    @Column(unique = true)
    private String username;
    private String password;

    @ManyToMany
    @JoinTable(
        name = "BookmarkGame",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "game_id")
    )
    private Set<Game> bookmarkedGames = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<Review> reviews = new HashSet<>();

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Game> getBookmarkedGames() {
        return bookmarkedGames;
    }

    public void addBookmark(Game game) {
        this.bookmarkedGames.add(game);
        game.getBookmarks().add(this);
    }

    public void removeBookmark(Game game) {
        if (this.bookmarkedGames.contains(game))
        {
            this.bookmarkedGames.remove(game);
            game.getBookmarks().remove(this);
        }
    }
}
