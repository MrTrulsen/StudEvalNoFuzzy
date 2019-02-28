package com.StudEval.StudEvalNoFuzzy.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Frontpage {

    @RequestMapping("/")
    public String index(){
        return "index.html";
    }

    @RequestMapping("/teacherlogin")
    public String teacherLogin(){
        return "sites/teacherLogin.html";
    }

    @RequestMapping("/studentlogin")
    public String studentLogin(){
        return "sites/studentLogin.html";
    }
}
