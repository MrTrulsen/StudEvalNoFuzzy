package com.StudEval.StudEvalNoFuzzy.RowMappers;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class QuestionRowMapper implements RowMapper<Question> {

    @Override
    public Question mapRow(ResultSet rs, int rowIndex) throws SQLException {

       return new Question (rs.getInt("question_id"),
                rs.getString("question_text"),
                rs.getFloat("complexity"),
                rs.getFloat("time_use"),
                rs.getFloat("difficulty"),
                rs.getFloat("importance"));

    }
}
