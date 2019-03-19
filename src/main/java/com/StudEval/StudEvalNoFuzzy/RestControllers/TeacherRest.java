package com.StudEval.StudEvalNoFuzzy.RestControllers;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.Repositories.MainRepository;
import com.StudEval.StudEvalNoFuzzy.Repositories.TeacherRepository;
import com.StudEval.StudEvalNoFuzzy.User.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TeacherRest {
    private final TeacherRepository teacherRepository;
    private final MainRepository mainRepository;
    @Autowired
    public TeacherRest(TeacherRepository teacherRepository, MainRepository mainRepository) {
        this.teacherRepository = teacherRepository;
        this.mainRepository = mainRepository;
    }

    @RequestMapping("/answers")
    public List<Answer> listRelatedAnswers(){
        //TO DO; implement ID to come in
        String course_id = "ID202712";
        List<Answer> answerList = teacherRepository.findRelatedAnswersToCourseId(course_id);
        return answerList;
    }

    @RequestMapping("/questionsToCourse")
    public List<Question> listRelatedQuestions(){
        //TO DO; implement course_ID to come in
        String course_id = "ID202712";
        List<Question> questionsList = new ArrayList<>();
        questionsList = mainRepository.findRelatedQuestionsToCourse(course_id);
        return questionsList;
    }

    @RequestMapping("/studentsInThisCourse")
    public List<Student> listStudents(){
        //TO DO; implement course_ID to come in
        String course_id = "ID202712";
        List<Student> studentList = teacherRepository.findStudentsInCourse(course_id);
        return studentList;
    }


}


