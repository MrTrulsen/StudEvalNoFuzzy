package com.StudEval.StudEvalNoFuzzy.RestControllers;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Evaluation;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.Interfaces.UserRepository;
import com.StudEval.StudEvalNoFuzzy.Repositories.MainRepository;
import com.StudEval.StudEvalNoFuzzy.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MainRestController {

    @Autowired
    BCryptPasswordEncoder encoder;

    private final MainRepository mainRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    public MainRestController(MainRepository mainRepository) {
        this.mainRepository = mainRepository;
    }

    /**
     * This is for student responses!
     * @param answers
     * @return
     */
    @RequestMapping(value = "/addAnswers/{evalId}" , method = RequestMethod.POST)
    public ResponseEntity<String> addAnswers(@RequestBody List<Answer> answers){
        String error = mainRepository.addAnswers(answers);
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }

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


    @RequestMapping("/getEvaluations")
    public List<Evaluation> getEvaluations(){
        List<Evaluation> evals = new ArrayList<>();
        Integer userId = (int) getCurrentUser().getId();
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
        String email = getCurrentUser().getEmail();
        String error = mainRepository.addNewEvaluation(evaluation,course_name,email);
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

    @RequestMapping(value = "/deleteEvaluation/{evalId}" , method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteEvaluation(@PathVariable Integer evalId){
        String error = mainRepository.deleteEvaluation(evalId);
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/deleteUser/{id}" , method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteUser(@PathVariable String id){
        String error;
        User current = getCurrentUser();

        if (id.equals(Long.toString(current.getId())) || id == null){
            error = mainRepository.deleteUser(id);
        }else{
            error = "ERROR: You are not authorized to delete this user!";
            return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
        }

        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/deleteQuestion/{questionId}" , method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteQuestion(@PathVariable Integer questionId){
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


    @RequestMapping(value = "/changePassword/{oldPassword}/{newPassword}", method = RequestMethod.POST)
    public ResponseEntity<String> changePassword(@PathVariable String newPassword,@PathVariable String oldPassword){
     String currentUserEmail = getCurrentUser().getEmail();
     String currentPassword = getCurrentUser().getPassword();
     String error = "";
     if(encoder.matches(oldPassword,currentPassword)){
             error = mainRepository.changePassword(encoder.encode(newPassword),currentUserEmail);
     }
     if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
     }
     else {
         return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
     }
    }

    @RequestMapping(value = "/getCurrentUser")
    public String getCurrentUserName(){
        String email = getCurrentUser().getEmail();
        String userName;
        try{
            Integer index = email.indexOf("@");
            userName = email.substring(0,index);
        }
        catch(Exception ex){
            return "ERROR : " + ex;
        }
        return userName;
    }

    public ResponseEntity<String> registerNewPassword(User user){
        String error = mainRepository.changePassword(encoder.encode(user.getPassword()),user.getEmail());
        if(error == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    public boolean isUserActive(String email){
        Boolean isActive = mainRepository.isUserActive(email);
        return isActive;
    }



    /**
     * Gets the current user logged in.
     * @return Current logged in user.
     */
    private User getCurrentUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String loggedInUsername;

        if (principal instanceof UserDetails){
            loggedInUsername = ((UserDetails)principal).getUsername();
        }else{
            loggedInUsername = principal.toString();
        }

        return userRepository.findByEmail(loggedInUsername);
    }


}
