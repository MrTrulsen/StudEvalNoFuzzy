package com.StudEval.StudEvalNoFuzzy.Evaluation;

public class Answer {
    private int answer_id;
    private int question_id;
    private float complexity;
    private float time;
    private float difficulty;
    private float importance;

    public Answer(int answer_id, int question_id, float complexity, float time, float difficulty, float importance) {
        this.answer_id = answer_id;
        this.question_id = question_id;
        this.complexity = complexity;
        this.time = time;
        this.difficulty = difficulty;
        this.importance = importance;
    }

    public int getAnswer_id() {
        return answer_id;
    }

    public void setAnswer_id(int answer_id) {
        this.answer_id = answer_id;
    }

    public int getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(int question_id) {
        this.question_id = question_id;
    }

    public float getComplex() {
        return complexity;
    }

    public void setComplex(float complex) {
        this.complexity = complex;
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

    public void setDifficulty(float difficulity) {
        this.difficulty = difficulity;
    }

    public float getImportance() {
        return importance;
    }

    public void setImportance(float importance) {
        this.importance = importance;
    }
}
