package com.StudEval.StudEvalNoFuzzy.Evaluation;

public class Question {
    private int question_id;
    private String text;
    private float complexity;
    private float time;
    private float difficulty;
    private float importance;

    public Question(int question_id, String text, float complexity, float time, float difficulty, float importance) {
        this.question_id = question_id;
        this.text = text;
        this.complexity = complexity;
        this.time = time;
        this.difficulty = difficulty;
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

    public float getcomplexity() {
        return complexity;
    }

    public void setcomplexity(float complexity) {
        this.complexity = complexity;
    }

    public float getTime() {
        return time;
    }

    public void setTime(float time) {
        this.time = time;
    }

    public float getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(float difficulty) {
        this.difficulty = difficulty;
    }

    public float getImportance() {
        return importance;
    }

    public void setImportance(float importance) {
        this.importance = importance;
    }
}
