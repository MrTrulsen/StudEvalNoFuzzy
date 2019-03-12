package com.StudEval.StudEvalNoFuzzy.RestControllers;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.Repositories.StudentRepository;
import com.StudEval.StudEvalNoFuzzy.Repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TeacherRest {
    private final TeacherRepository teacherRepository;

    @Autowired
    public TeacherRest(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @RequestMapping("/answers")
    public List<Answer> listRelatedAnswer(){
        //TO DO; implement ID to come in
        String course_id = "ID202712";
        List<Integer> idList = teacherRepository.findRelatedQuestionIdToCourse(course_id);
        List<Answer> answerList = new ArrayList<>();
        for(Integer id : idList){
            Answer answer = teacherRepository.findRelatedAnswersToCourse(id);
            answerList.add(answer);
        }
        return answerList;
    }
}
