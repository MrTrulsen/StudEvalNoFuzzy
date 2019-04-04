package com.StudEval.StudEvalNoFuzzy.Evaluation;

import java.util.Date;

public class Evaluation {
    private int evalId;
    private Date startDate;
    private Date stopDate;
    private String courseId;
    private Integer timeOfExam;


    public Evaluation(int evalId, Date startDate, Date stopDate, String courseId, int timeOfExam) {
        this.evalId = evalId;
        this.startDate = startDate;
        this.stopDate = stopDate;
        this.courseId = courseId;
        this.timeOfExam = timeOfExam;
    }


    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getStopDate() {
        return stopDate;
    }

    public void setStopDate(Date stopDate) {
        this.stopDate = stopDate;
    }


    public int getEvalId() {
        return evalId;
    }

    public void setEvalId(int evalId) {
        this.evalId = evalId;
    }


    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public Integer getTimeOfExam() {
        return timeOfExam;
    }

    public void setTimeOfExam(Integer timeOfExam) {
        this.timeOfExam = timeOfExam;
    }

}
