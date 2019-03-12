package com.StudEval.StudEvalNoFuzzy.Evaluation;

public class Course {
    private String course_id;
    private String name;

    public Course(String course_id, String name) {
        this.course_id = course_id;
        this.name = name;
    }

    public String getCourse_id() {
        return course_id;
    }

    public void setCourse_id(String course_id) {
        this.course_id = course_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
