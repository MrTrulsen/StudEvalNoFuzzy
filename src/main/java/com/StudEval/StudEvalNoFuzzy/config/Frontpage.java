package com.StudEval.StudEvalNoFuzzy.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class Frontpage {

    @RequestMapping("/")
    public String index(){
        return "index.html";
    }

    @RequestMapping(value = { "/teacherlogin" }, method = RequestMethod.GET)
    public String teacherLogin(){
        return "sites/teacherLogin.html";
    }

    @RequestMapping("/studentlogin")
    public String studentLogin(){
        return "sites/studentLogin.html";
    }
}
