package com.StudEval.StudEvalNoFuzzy.Evaluation;

public class Course {
    private int course_id;
    private String name;

    public Course(int course_id, String name) {
        this.course_id = course_id;
        this.name = name;
    }

    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
