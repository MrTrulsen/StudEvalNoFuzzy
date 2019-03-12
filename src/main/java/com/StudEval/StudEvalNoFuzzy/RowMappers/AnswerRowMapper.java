package com.StudEval.StudEvalNoFuzzy.RowMappers;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AnswerRowMapper implements RowMapper<Answer> {

    @Override
    public Answer mapRow(ResultSet rs, int rowIndex) throws SQLException {
        return new Answer( rs.getInt("answer_id"),
                rs.getInt("question_id"),
                rs.getFloat("complexity"),
                rs.getFloat("time_use"),
                rs.getFloat("difficulty"),
                rs.getFloat("importance"));

    }
}
