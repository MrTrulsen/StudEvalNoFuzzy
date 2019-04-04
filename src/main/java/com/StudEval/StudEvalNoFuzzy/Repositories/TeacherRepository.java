package com.StudEval.StudEvalNoFuzzy.Repositories;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Course;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Evaluation;
import com.StudEval.StudEvalNoFuzzy.RowMappers.CourseIdRowMapper;
import com.StudEval.StudEvalNoFuzzy.User.Role;
import com.StudEval.StudEvalNoFuzzy.User.Student;
import com.StudEval.StudEvalNoFuzzy.User.User;
import javassist.bytecode.stackmap.BasicBlock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import javax.sql.RowSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class TeacherRepository {
    private final JdbcTemplate jdbcTemplate;
    private CourseIdRowMapper courseIdRowMapper = new CourseIdRowMapper();

    @Autowired
    public TeacherRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Fetches the related questions
     *
     * @param evalId
     * @return The question with this id.
     */
    public List findRelatedAnswersToCourseId(Integer evalId) {
        List<Answer> answers = new ArrayList<>();
        String query = "SELECT r.* FROM responses r INNER JOIN eval_ques_junc j ON r.question_id = j.question_id WHERE eval_id=?";
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(query, new Object[]{evalId});
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


    /**
     * Fetches the students(users with role id = 2) in given evaluation.
     *
     * @param evalId
     * @return
     */
    public List<String> findStudentsInEvaluation(Integer evalId) {
        List<String> studentsEmailsInCurrentEval = new ArrayList<>();

        //Kan gjøre denne om denne query senere for å få ut eventuelle lærere til emne
        String query = "SELECT u.* FROM user u " +
                "INNER JOIN user_role r ON u.user_id = r.user_id " +
                "INNER JOIN eval_user_junc e ON u.user_id = e.user_id " +
                "WHERE role_id=2 AND eval_id=?";

        SqlRowSet rs = jdbcTemplate.queryForRowSet(query, new Object[]{evalId});
        while (rs.next()) {
            String userEmail = new String(rs.getString("email"));
            studentsEmailsInCurrentEval.add(userEmail);
        }
        return studentsEmailsInCurrentEval;
    }


    /**
     * Finding all the current users in db
     *
     * @return List of users in db
     */
    public List<User> findUsersInDb() {
        List<User> users = new ArrayList<>();
        String query = "SELECT user_id, email, is_active FROM user";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(query);
        User user;
        while (rs.next()) {
            user = new User(rs.getString("email"),
                    "",
                    rs.getInt("is_active"));
            users.add(user);
        }
        return users;
    }

    /**
     * Importing students to the actual course.
     *
     * @param users
     * @param evalId
     * @return null if success, if not success "Could not add students."
     */
    public String importStudentsToEvaluation(List<User> users, Integer evalId) {
        List<User> usersExistingInDb = findUsersInDb();
        int numRows = 0;
        for (User user : users) {
            if (!usersExistingInDb.contains(user.getEmail())) {
                //Then add student
                user.setStatus(0);
                Role role = new Role();
                role.setId(2);
                addUser(user, role);
                user.setId(getNewUserId(user.getEmail()));
            }
            String query = "REPLACE INTO eval_user_junc(user_id,eval_id) VALUES(?,?)";
            try {
                numRows = jdbcTemplate.update(query, user.getId(), evalId);

            } catch (Exception ex) {
                return "Could not add students: " + ex.getMessage();
            }
        }
        if (numRows == 1) {
            return null;
        } else {
            return "Could not add students.";
        }
    }

    /**
     * Adds a user in db if the user have not registered yet.
     *
     * @param user
     */
    public void addUser(User user, Role role) {
        String query = "INSERT INTO user (email,is_active) VALUES (?,?)";
        jdbcTemplate.update(query, user.getEmail(), user.getStatus());
        Integer newId = getNewUserId(user.getEmail());
        String query2 = "INSERT INTO user_role (user_id,role_id) VALUES (?,?)";
        jdbcTemplate.update(query2, newId, role.getId());
    }

    /**
     * Gets the new user_id of requested user recently added.
     *
     * @param email
     * @return user id of requested email
     */
    public int getNewUserId(String email) {
        String query = "SELECT user_id FROM user WHERE email=?";
        Integer user_id;
        user_id = jdbcTemplate.queryForObject(query, new Object[]{email}, Integer.class);
        return user_id;
    }


    /**
     * Adds new evaluation
     *
     * @param evaluation
     * @return null if success, "Could not add evaluation" else
     */
    public String addNewEvaluation(Evaluation evaluation, String courseName) {
        String query = "INSERT INTO evaluation (date_start,date_stop, course_id, time_of_exam) VALUES (?,?,?,?)";
        List<String> courseIds = getAllCourses();
        Integer numRows;

        for (String courseId : courseIds) {
            if (!courseIds.contains(evaluation.getCourseId())) {
                addCourse(evaluation.getCourseId(), courseName);
                //This is not working properly.
                //courseIds.add(courseName);
            }
        }
        numRows = jdbcTemplate.update(query, evaluation.getStartDate(), evaluation.getStopDate(), evaluation.getCourseId(), evaluation.getTimeOfExam());
        if (numRows == 1) {
            return null;
        } else {
            return "Could not add evaluation";
        }
    }

    /**
     * Adds a course
     *
     * @param courseName
     */
    private void addCourse(String courseId, String courseName) {
        String query = "INSERT INTO course (course_id,name) VALUES (?,?)";
        try {
            jdbcTemplate.update(query, courseId, courseName);
        } catch (Exception ex) {
            throw ex;
        }

    }

    /**
     * Fetches all the courses with time
     *
     * @return
     */
    private List<String> getAllCourses() {
        String query = "SELECT course_id FROM course";
        List<String> courseIds = new ArrayList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(query);
        while (rs.next()) {
            String courseId = (rs.getString("course_id"));
            courseIds.add(courseId);
        }
        return courseIds;
    }

}
