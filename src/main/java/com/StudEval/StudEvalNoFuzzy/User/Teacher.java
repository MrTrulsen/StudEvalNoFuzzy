package com.StudEval.StudEvalNoFuzzy.User;

public class Teacher {
    private int teacher_id;
    private String email;
    private String password;
    private boolean isActive;

    public Teacher(int teacher_id, String email, String password, boolean isActive) {
        this.teacher_id = teacher_id;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
    }


    public int getTeacher_id() {
        return teacher_id;
    }

    public void setTeacher_id(int teacher_id) {
        this.teacher_id = teacher_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
}
