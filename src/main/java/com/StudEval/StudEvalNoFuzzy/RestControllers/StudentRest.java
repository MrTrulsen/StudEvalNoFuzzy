package com.StudEval.StudEvalNoFuzzy.RestControllers;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.Repositories.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StudentRest {

    private final MainRepository mainRepository;


    @Autowired
    public StudentRest(MainRepository mainRepository) {
        this.mainRepository = mainRepository;
    }


    @RequestMapping("/getQuestionsInEval")
    public List<Question> listRelatedQuestions(){
        //TO DO; implement course_ID to come in
        Integer evalId = 1;
        List<Question> questionsList = new ArrayList<>();
        questionsList = mainRepository.findRelatedQuestionsToEval(evalId);
        return questionsList;
    }


}
