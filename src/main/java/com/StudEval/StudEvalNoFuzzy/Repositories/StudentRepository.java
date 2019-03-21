package com.StudEval.StudEvalNoFuzzy.Repositories;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Course;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.RowMappers.CourseIdRowMapper;
import com.StudEval.StudEvalNoFuzzy.RowMappers.CourseRowMapper;
import com.StudEval.StudEvalNoFuzzy.RowMappers.QuestionRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
//import sun.applet.Main;

import java.util.ArrayList;
import java.util.List;

@Repository
public class StudentRepository {
    private final JdbcTemplate jdbcTemplate;
    private QuestionRowMapper questionRowMapper = new QuestionRowMapper();
    private CourseRowMapper courseRowMapper = new CourseRowMapper();
    private CourseIdRowMapper courseIdRowMapper = new CourseIdRowMapper();

    @Autowired
    public StudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //This in only for testing
    public List<Question> findAllQuestions(){
        List<Question> questions = new ArrayList<>();
        return jdbcTemplate.query("SELECT * FROM questions", questionRowMapper);
    }

}
