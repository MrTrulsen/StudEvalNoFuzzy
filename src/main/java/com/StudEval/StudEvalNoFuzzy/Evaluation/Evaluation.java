package com.StudEval.StudEvalNoFuzzy.Evaluation;

import java.util.Date;

public class Evaluation {
    private int eval_id;
    private Date date;
    private String course_id;

    public Evaluation(int eval_id, Date date, String course_id) {
        this.eval_id = eval_id;
        this.date = date;
        this.course_id = course_id;
    }

    public int getEval_id() {
        return eval_id;
    }

    public Date getDate() {
        return date;
    }

    public String getCourse_id() {
        return course_id;
    }

    public void setEval_id(int eval_id) {
        this.eval_id = eval_id;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setCourse_id(String course_id) {
        this.course_id = course_id;
    }
}
