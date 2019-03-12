package com.StudEval.StudEvalNoFuzzy.RowMappers;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Course;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CourseRowMapper implements RowMapper<Course> {

    @Override
    public Course mapRow(ResultSet rs, int rowIndex) throws SQLException {
        return new Course (rs.getString("course_id"),
                rs.getString("name"));

    }
}
