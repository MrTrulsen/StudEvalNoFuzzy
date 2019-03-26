package com.StudEval.StudEvalNoFuzzy.User;

public class Student {
    private int student_id;
    private String email;
    private String password;
    private boolean isActive;

    public Student(int student_id, String email, String password, boolean isActive) {
        this.student_id = student_id;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
    }


    public int getStudent_id() {
        return student_id;
    }

    public void setStudent_id(int student_id) {
        this.student_id = student_id;
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
