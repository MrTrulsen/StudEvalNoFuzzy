package com.StudEval.StudEvalNoFuzzy.User;



import org.springframework.data.annotation.Id;

import javax.persistence.Column;

public class User {

    @Id
    private int id;
    @Column(nullable = false, unique = true)
    private String username;
    private String password;
    private String role;
    private boolean isActive;

    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
