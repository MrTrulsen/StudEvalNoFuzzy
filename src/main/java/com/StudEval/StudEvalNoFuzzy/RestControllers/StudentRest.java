package com.StudEval.StudEvalNoFuzzy.RestControllers;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.Repositories.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/addAnswers/{evalId}" , method = RequestMethod.POST)
    public ResponseEntity<String> addQuestions(@RequestBody List<Answer> answers, @PathVariable Integer evalId){
        String error = mainRepository.addAnswers(answers,evalId);
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }

    }

}
