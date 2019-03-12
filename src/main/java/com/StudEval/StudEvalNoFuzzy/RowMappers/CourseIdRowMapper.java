package com.StudEval.StudEvalNoFuzzy.RowMappers;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CourseIdRowMapper implements RowMapper<Integer> {

    private int question_id;

    @Override
    public Integer mapRow(ResultSet rs, int rowIndex) throws SQLException {
        return rs.getInt("question_id");

    }
}