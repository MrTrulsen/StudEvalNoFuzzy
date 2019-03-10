package com.StudEval.StudEvalNoFuzzy.config;


import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.Repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
public class StudentPagesController {

    @RequestMapping("/studentpage")
    public String studentpage(){
        return "sites/studentDashboard.html";
    }
}
