package com.StudEval.StudEvalNoFuzzy.PageControllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class StudentPagesController {

    @RequestMapping(value = {"/studentpage"}, method = {RequestMethod.GET})
    public String studentDashboard(){
        return "studentdashboard";
    }

}
