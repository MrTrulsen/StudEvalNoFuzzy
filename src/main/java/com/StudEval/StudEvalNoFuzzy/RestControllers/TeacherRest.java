package com.StudEval.StudEvalNoFuzzy.RestControllers;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Evaluation;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.Repositories.MainRepository;
import com.StudEval.StudEvalNoFuzzy.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TeacherRest {
    private final MainRepository mainRepository;

    @Autowired
    public TeacherRest(MainRepository mainRepository) {
        this.mainRepository = mainRepository;
    }

    @RequestMapping("/getAnswersInEval/{evalId}")
    public List<Answer> listRelatedAnswers(@PathVariable Integer evalId){
        List<Answer> answerList = mainRepository.findRelatedAnswersToEvalId(evalId);
        return answerList;
    }

    @RequestMapping("/getQuestionsInEval/{evalId}")
    public List<Question> listRelatedQuestions(@PathVariable Integer evalId){
        List<Question> questionsList = new ArrayList<>();
        questionsList = mainRepository.findRelatedQuestionsToEval(evalId);
        return questionsList;
    }

    @RequestMapping("/studentsEmailsInEval/{evalId}")
    public List<String> listStudentEmailsInEval(@PathVariable Integer evalId){
        List<String> studentEmailList = mainRepository.findStudentsInEvaluation(evalId);
        return studentEmailList;
    }


    @RequestMapping("/getEvaluations/{userId}")
    public List<Evaluation> getEvaluations(@PathVariable Integer userId){
        List<Evaluation> evals = new ArrayList<>();
        try{
            evals = mainRepository.getEvaluations(userId);
        }
        catch(Exception ex){
            evals.clear();
            return evals;
        }
        return evals;
    }

    @RequestMapping("/getNameOfCourse/{courseId}")
    public String getNameOfCourse(@PathVariable String courseId){
        String courseName = mainRepository.getCourseNameFromEval(courseId);
        return courseName;
    }


    @RequestMapping(value = "/addStudents/{evalId}" , method = RequestMethod.POST)
    public ResponseEntity<String> addStudents(@RequestBody List<User> users, @PathVariable Integer evalId){

        String error = mainRepository.importUsersToEvaluation(users,evalId);
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/addEvaluation/{course_name}" , method = RequestMethod.POST)
    public ResponseEntity<String> addEvaluation(@RequestBody Evaluation evaluation, @PathVariable String course_name){

        String error = mainRepository.addNewEvaluation(evaluation,course_name);
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/addQuestions/{evalId}" , method = RequestMethod.POST)
    public ResponseEntity<String> addQuestions(@RequestBody List<Question> questions,@PathVariable Integer evalId){
        String error = mainRepository.addQuestionList(questions,evalId);
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/addQuestion/{evalId}" , method = RequestMethod.POST)
    public ResponseEntity<String> addQuestion(@RequestBody Question question,@PathVariable Integer evalId){
        String error = mainRepository.addQuestion(question,evalId);
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/deleteEvaluation/{evalId}" , method = RequestMethod.POST)
    public ResponseEntity<String> deleteEvaluation(@PathVariable Integer evalId){
        String error = mainRepository.deleteEvaluation(evalId);
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/deleteUser/{email}" , method = RequestMethod.POST)
    public ResponseEntity<String> deleteUser(@PathVariable String email){
        String error = mainRepository.deleteUser(email);
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/deleteQuestion/{questionId}" , method = RequestMethod.POST)
    public ResponseEntity<String> deleteUser(@PathVariable Integer questionId){
        String error = mainRepository.deleteQuestionFromEvaluation(questionId);
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/editQuestion" , method = RequestMethod.POST)
    public ResponseEntity<String> editQuestion(@RequestBody Question question){
        String error = mainRepository.editQuestion(question);
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }



}


