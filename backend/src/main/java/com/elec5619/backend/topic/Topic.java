package com.elec5619.backend.topic;

import jakarta.persistence.*;

@Entity
@Table(name = "Topic", schema = "public")
public class Topic {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
