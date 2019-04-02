package com.StudEval.StudEvalNoFuzzy.Repositories;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import com.StudEval.StudEvalNoFuzzy.RowMappers.CourseIdRowMapper;
import com.StudEval.StudEvalNoFuzzy.User.Student;
import com.StudEval.StudEvalNoFuzzy.User.User;
import javassist.bytecode.stackmap.BasicBlock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import javax.sql.RowSet;
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
     *
     * @param course_id
     * @return list of questions id (int)
     */
    public List<Integer> findRelatedQuestionIdToCourse(String course_id) {
        List<Integer> questionIdList = new ArrayList<>();
        String query = "SELECT question_id FROM course_ques_junc WHERE course_id =?";
        questionIdList = jdbcTemplate.query(query, new Object[]{course_id}, courseIdRowMapper);
        return questionIdList;
    }

    /**
     * Fetches the related questions
     *
     * @param course_id
     * @return The question with this id.
     */
    public List findRelatedAnswersToCourseId(String course_id) {
        List<Answer> answers = new ArrayList<>();
        String query = "SELECT r.* FROM responses r INNER JOIN course_ques_junc j ON r.question_id = j.question_id WHERE course_id=?";
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(query, new Object[]{course_id});
        if (rowSet.first()) {
            Answer answer = new Answer(rowSet.getInt("answer_id"),
                    rowSet.getInt("question_id"),
                    rowSet.getFloat("complexity"),
                    rowSet.getFloat("time_use"),
                    rowSet.getFloat("difficulty"),
                    rowSet.getFloat("importance"));
            answers.add(answer);
            while (rowSet.next()) {
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


    public List<Student> findStudentsInCourse(String course_id) {
        return null;
    }

    /**
     * Finding all the current users in db
     * @return List of users in db
     */
    public List<User> findUsersInDb() {
        List<User> users = new ArrayList<>();
        String query = "SELECT user_id, email, is_active FROM user";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(query);
        while (rs.next()) {
            User user = new User(rs.getString("email"),
                    "",
                    rs.getInt("is_active"));
            users.add(user);
        }
        return users;
    }

    /**
     * Importing students to the actual course.
     * @param users
     * @param eval_id
     * @return null if success, if not success "Could not add students."
     */
    public String importStudentsToEvaluation(List<User> users, Integer eval_id) {
        List<User> usersExistingInDb = findUsersInDb();
        int numRows = 0;
        for (User user : users) {
            if (!usersExistingInDb.contains(user.getEmail())) {
                user.setStatus(0);
                addUser(user);
                user.setId(getNewUserId(user.getEmail()));
            }
            String query = "REPLACE INTO eval_user_junc(user_id,eval_id) VALUES(?,?)";
            try {
                numRows = jdbcTemplate.update(query, user.getId(), eval_id);

            } catch (Exception ex) {
                return "Could not add students: " + ex.getMessage();
            }
        }
        if(numRows == 1){
            return null;
        }
        else {
            return "Could not add students.";
        }
    }

    /**
     * Adds a user in db if the user have not registred yet.
     * @param user
     */
    public void addUser(User user) {
        String query = "INSERT INTO user (email,is_active) VALUES (?,?)";
        try {
            jdbcTemplate.update(query, user.getEmail(),user.getStatus());
        } catch (Exception ex) {
            throw ex;
        }
    }

    public int getNewUserId(String email){
        String query = "SELECT user_id FROM user WHERE email=?";
        Integer user_id;
        try{
             user_id = jdbcTemplate.queryForObject(query,new Object[]{email},Integer.class);
        }
        catch(Exception ex){
            throw ex;
        }
        return user_id;
    }

}
