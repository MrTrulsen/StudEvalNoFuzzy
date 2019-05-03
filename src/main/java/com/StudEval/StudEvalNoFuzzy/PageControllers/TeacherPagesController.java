package com.StudEval.StudEvalNoFuzzy.PageControllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class TeacherPagesController {

    @RequestMapping(value = { "/teacherpage" }, method = RequestMethod.GET)
    public String teacherDashboard(){
        return "teacherDashboard.html";
    }

    @RequestMapping("/teacherpage/evaluation")
    public String teacherEvaluation(){
        return "teacherEvaluation.html";
    }

}
