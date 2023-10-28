package com.elec5619.backend.game;

public class GameRequest {
    private String name;
    private Long rawgId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRawgId(Long rawgId) {
        this.rawgId = rawgId;
    }

    public Long getRawgId() {
        return rawgId;
    }
}
