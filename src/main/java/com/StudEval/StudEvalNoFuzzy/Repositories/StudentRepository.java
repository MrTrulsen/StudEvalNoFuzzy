package com.StudEval.StudEvalNoFuzzy.Repositories;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Course;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.RowMappers.CourseIdRowMapper;
import com.StudEval.StudEvalNoFuzzy.RowMappers.CourseRowMapper;
import com.StudEval.StudEvalNoFuzzy.RowMappers.QuestionRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

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
     * Fetches the related questions one question at a time
     * @param course_id
     * @return The question with this id.
     */
    public List findRelatedQuestionsToCourse(String course_id){
        List<Question> questions = new ArrayList<>();
        String query = "SELECT q.* FROM questions q INNER JOIN course_ques_junc j ON q.question_id = j.question_id WHERE course_id=?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(query, new Object[] {course_id});
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
