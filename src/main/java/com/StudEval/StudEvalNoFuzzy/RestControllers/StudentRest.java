package com.StudEval.StudEvalNoFuzzy.RestControllers;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Course;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.Repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StudentRest {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentRest(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @RequestMapping("/questions")
    public List<Question> listAllQuestions(){
        return studentRepository.findAllQuestions();
    }

    @RequestMapping("/somequestions")
    public List<Question> listRelatedQuestions(){
        //TO DO; implement course_ID to come in
        String course_id = "ID202712";
        List<Question> questionsList = new ArrayList<>();
        questionsList = studentRepository.findRelatedQuestionsToCourse(course_id);
        return questionsList;
    }
}
