package com.StudEval.StudEvalNoFuzzy.Evaluation;

public class Answer {
    private int answer_id;
    private int question_id;
    private float complex;
    private float time;
    private float difficulity;
    private float importance;

    public Answer(int answer_id, int question_id, float complex, float time, float difficulity, float importance) {
        this.answer_id = answer_id;
        this.question_id = question_id;
        this.complex = complex;
        this.time = time;
        this.difficulity = difficulity;
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
