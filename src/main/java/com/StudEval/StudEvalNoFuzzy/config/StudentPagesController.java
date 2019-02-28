package com.StudEval.StudEvalNoFuzzy.config;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StudentPagesController {

    @RequestMapping("/studentpage")
    public String studentpage(){
        return "sites/studentDashboard.html";
    }
}
