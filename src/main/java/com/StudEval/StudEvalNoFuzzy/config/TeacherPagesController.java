package com.StudEval.StudEvalNoFuzzy.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TeacherPagesController {

    @RequestMapping("/teacherpage")
    public String teacherDashboard(){
        return "sites/teacherDashboard.html";
    }

    @RequestMapping("/teacherpage/registerstudents")
    public String teacherRegisterStudent(){
        return "sites/registerStudents.html";
    }

    @RequestMapping("/teacherpage/addevaluation")
    public String teacherAddEvaluation(){
        return "sites/addEvaluation.html";
    }

    @RequestMapping("/teacherpage/evaluation")
    public String teacherEvaluation(){
        return "sites/evaluation.html";
    }

    @RequestMapping("/teacherpage/evaluationResults")
    public String teacherEvaluationResults(){
        return "sites/evaluationResults.html";
    }
}
