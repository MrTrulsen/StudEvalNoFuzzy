package com.StudEval.StudEvalNoFuzzy.Evaluation;

public class Question {
    private int question_id;
    private String text;
    private float complex;
    private float time;
    private float difficulity;
    private float importance;

    public Question(int question_id, String text, float complex, float time, float difficulity, float importance) {
        this.question_id = question_id;
        this.text = text;
        this.complex = complex;
        this.time = time;
        this.difficulity = difficulity;
        this.importance = importance;
    }

    public int getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(int question_id) {
        this.question_id = question_id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public float getComplex() {
        return complex;
    }

    public void setComplex(float complex) {
        this.complex = complex;
    }

    public float getTime() {
        return time;
    }

    public void setTime(float time) {
        this.time = time;
    }

    public float getDifficulity() {
        return difficulity;
    }

    public void setDifficulity(float difficulity) {
        this.difficulity = difficulity;
    }

    public float getImportance() {
        return importance;
    }

    public void setImportance(float importance) {
        this.importance = importance;
    }
}
