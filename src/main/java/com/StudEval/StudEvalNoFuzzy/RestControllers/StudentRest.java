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
        //TO DO; implement ID to come in
        String course_id = "ID202712";
        List<Integer> idList = studentRepository.findRelatedQuestionIdToCourse(course_id);
        List<Question> questionsList = new ArrayList<>();
        for(Integer id : idList){
            Question question = studentRepository.findRelatedQuestionsToCourse(id);
            questionsList.add(question);
        }
        return questionsList;
    }
}
