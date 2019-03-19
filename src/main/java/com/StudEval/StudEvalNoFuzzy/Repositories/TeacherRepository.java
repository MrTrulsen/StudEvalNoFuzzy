package com.StudEval.StudEvalNoFuzzy.Repositories;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.RowMappers.CourseIdRowMapper;
import com.StudEval.StudEvalNoFuzzy.RowMappers.CourseRowMapper;
import com.StudEval.StudEvalNoFuzzy.RowMappers.QuestionRowMapper;
import com.StudEval.StudEvalNoFuzzy.User.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TeacherRepository {
    private final JdbcTemplate jdbcTemplate;
    private CourseIdRowMapper courseIdRowMapper = new CourseIdRowMapper();

    @Autowired
    public TeacherRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    /**
     * Fetches the id's of the questions to a specific course
     * @param course_id
     * @return list of questions id (int)
     */
    public List<Integer> findRelatedQuestionIdToCourse(String course_id){
        List<Integer> questionIdList = new ArrayList<>();
        String query = "SELECT question_id FROM course_ques_junc WHERE course_id =?";
        questionIdList = jdbcTemplate.query(query, new Object[] {course_id}, courseIdRowMapper);
        return questionIdList;
    }

    /**
     * Fetches the related questions
     * @param course_id
     * @return The question with this id.
     */
    public List findRelatedAnswersToCourseId(String course_id){
        List<Answer> answers = new ArrayList<>();
        String query = "SELECT r.* FROM responses r INNER JOIN course_ques_junc j ON r.question_id = j.question_id WHERE course_id=?";
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(query, new Object[] {course_id});
        if(rowSet.first()){
            Answer answer = new Answer(rowSet.getInt("answer_id"),
                    rowSet.getInt("question_id"),
                    rowSet.getFloat("complexity"),
                    rowSet.getFloat("time_use"),
                    rowSet.getFloat("difficulty"),
                    rowSet.getFloat("importance"));
            answers.add(answer);
            while(rowSet.next()){
                answer = new Answer(rowSet.getInt("answer_id"),
                        rowSet.getInt("question_id"),
                        rowSet.getFloat("complexity"),
                        rowSet.getFloat("time_use"),
                        rowSet.getFloat("difficulty"),
                        rowSet.getFloat("importance"));
                answers.add(answer);
            }
        }
        return answers;
    }


    public List<Student> findStudentsInCourse(String course_id){
     return null;
    }



}
