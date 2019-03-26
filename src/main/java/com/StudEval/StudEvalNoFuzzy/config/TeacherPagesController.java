package com.StudEval.StudEvalNoFuzzy.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class TeacherPagesController {

    @RequestMapping(value = { "/teacherpage" }, method = RequestMethod.GET)
    public String teacherDashboard(){
        return "teacherdashboard.html";
    }

    @RequestMapping("/teacherpage/registerstudents")
    public String teacherRegisterStudent(){
        return "registerstudents.html";
    }

    @RequestMapping("/teacherpage/addevaluation")
    public String teacherAddEvaluation(){
        return "addevaluation.html";
    }

    @RequestMapping("/teacherpage/evaluation")
    public String teacherEvaluation(){
        return "evaluation.html";
    }

    @RequestMapping("/teacherpage/evaluationResults")
    public String teacherEvaluationResults(){
        return "evaluationResults.html";
    }

}
