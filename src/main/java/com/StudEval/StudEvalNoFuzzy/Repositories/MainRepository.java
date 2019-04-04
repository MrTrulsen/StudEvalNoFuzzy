package com.StudEval.StudEvalNoFuzzy.Repositories;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
//import sun.applet.Main;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MainRepository {
    private JdbcTemplate jdbcTemplate;


    @Autowired
    public MainRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    /**
     * Fetches the related questions to the right course
     * @param evalId
     * @return The question with this id.
     */
    public List findRelatedQuestionsToEval(Integer evalId){
        List<Question> questions = new ArrayList<>();
        String query = "SELECT q.* FROM questions q INNER JOIN eval_ques_junc j ON q.question_id = j.question_id WHERE eval_id=?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(query, new Object[] {evalId});
        if(rs.first()){
            Question question = new Question(rs.getInt("question_id"),
                    rs.getString("question_text"),
                    rs.getFloat("complexity"),
                    rs.getFloat("time_use"),
                    rs.getFloat("difficulty"),
                    rs.getFloat("importance"));
            questions.add(question);
            while(rs.next()){
                question = new Question(rs.getInt("question_id"),
                        rs.getString("question_text"),
                        rs.getFloat("complexity"),
                        rs.getFloat("time_use"),
                        rs.getFloat("difficulty"),
                        rs.getFloat("importance"));
                questions.add(question);
            }
        }
        return questions;
    }
}
