package com.StudEval.StudEvalNoFuzzy.Repositories;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class RepositoryTool {
    private final JdbcTemplate jdbcTemplate;


    public RepositoryTool(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Answer> findAllAnswersInDb(){
        List<Answer> answers = new ArrayList<>();

        return null;
        //temp
        // jdbcTemplate.query("SELECT * FROM books",);
    }
}
