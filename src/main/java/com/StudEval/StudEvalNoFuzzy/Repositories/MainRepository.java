package com.StudEval.StudEvalNoFuzzy.Repositories;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Evaluation;
import com.StudEval.StudEvalNoFuzzy.Evaluation.Question;
import com.StudEval.StudEvalNoFuzzy.User.Role;
import com.StudEval.StudEvalNoFuzzy.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
//import sun.applet.Main;

import javax.sql.RowSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MainRepository {
    private JdbcTemplate jdbcTemplate;


    @Autowired
    public MainRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    /**
     * Fetches the related questions to the right course
     *
     * @param evalId
     * @return The question with this id.
     */
    public List findRelatedQuestionsToEval(Integer evalId) {
        List<Question> questions = new ArrayList<>();
        String query = "SELECT q.* FROM questions q INNER JOIN eval_ques_junc j ON q.question_id = j.question_id WHERE eval_id=?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(query, new Object[]{evalId});
        if (rs.first()) {
            Question question = new Question(rs.getInt("question_id"),
                    rs.getString("question_text"),
                    rs.getFloat("complexity"),
                    rs.getFloat("time_use"),
                    rs.getFloat("difficulty"),
                    rs.getFloat("importance"));
            questions.add(question);
            while (rs.next()) {
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
    public List<String> findUserEmailsInDb() {
        List<String> userEmails = new ArrayList<>();
        String query = "SELECT email FROM user";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(query);
        while (rs.next()) {
            String user = (rs.getString("email"));
            userEmails.add(user);
        }
        return userEmails;
    }


    /**
     * Importing users to the actual course.
     *
     * @param users
     * @param evalId
     * @return null if success, if not success "Could not add users."
     */
    public String importUsersToEvaluation(List<User> users, Integer evalId) {
        List<String> userEmailsInDb = findUserEmailsInDb();
        int numRows = 0;
        for (User user : users) {
            if (!userEmailsInDb.contains(user.getEmail())) {
                //Then add student
                user.setStatus(0);
                Role role = new Role();
                role.setId(2);
                addUserToDb(user, role);
                user.setId(getNewUserId(user.getEmail()));
            }
            String query = "INSERT INTO eval_user_junc(user_id,eval_id) VALUES(?,?)";

            try {
                user.setId(getNewUserId(user.getEmail()));
                numRows = jdbcTemplate.update(query, user.getId(), evalId);

            } catch (Exception ex) {
                return "Could not add users: " + ex.getMessage();
            }
        }
        if (numRows == 1) {
            return null;
        } else {
            return "Could not add users.";
        }
    }

    /**
     * Adds a user in db if the user have not registered yet.
     *
     * @param user
     */
    public void addUserToDb(User user, Role role) {
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
        List<String> courseIds = getAllCourseIds();
        Integer numRows;

        if (!courseIds.contains(evaluation.getCourseId())) {
            addCourse(evaluation.getCourseId(), courseName);
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
     * Fetches all the course IDs
     *
     * @return
     */
    private List<String> getAllCourseIds() {
        String query = "SELECT course_id FROM course";
        List<String> courseIds = new ArrayList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(query);
        while (rs.next()) {
            String courseId = (rs.getString("course_id"));
            courseIds.add(courseId);
        }
        return courseIds;
    }

    /**
     * Fetches all the evals linked to a user.
     * @param user_id
     * @return evals
     */
    public List<Evaluation> getEvaluations(Integer user_id){
        List<Evaluation> evalList = new ArrayList<>();
        String query = "SELECT e.* FROM evaluation e INNER JOIN eval_user_junc ev ON e.eval_id = ev.eval_id WHERE user_id =?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(query,new Object[]{user_id});
        while(rs.next()){
            Evaluation eval = new Evaluation(rs.getInt("eval_id"),
                    rs.getDate("date_start"),
                    rs.getDate("date_stop"),
                    rs.getString("course_id"),
                    rs.getInt("time_of_exam"));
            evalList.add(eval);
        }
        return evalList;
    }

    /**
     * Adding the questions
     * @param questions
     * @param evalId
     * @return null if success, text if not.
     */
    public String addQuestions(List<Question> questions, Integer evalId){
        Integer numRows = 0;
        Integer lastInsertedId = 0;
        String query = "INSERT INTO questions(question_text,complexity, time_use, difficulty, importance) VALUES (?,?,?,?,?)";
        for(Question question : questions){
            numRows = jdbcTemplate.update(query, question.getText(),
                    question.getcomplexity(),
                    question.getTime(),
                    question.getDifficulty(),
                    question.getImportance());
            String getLastInsertedIdQuery = "SELECT LAST_INSERT_ID()";
            SqlRowSet rs = jdbcTemplate.queryForRowSet(getLastInsertedIdQuery);
            if(rs.next()){
               lastInsertedId = rs.getInt("LAST_INSERT_ID()");
            }
            String juncQuery = "INSERT INTO eval_ques_junc(question_id,eval_id) VALUES (?,?)";
            jdbcTemplate.update(juncQuery,lastInsertedId,evalId);
        }
        if (numRows == 1) {
            return null;
        } else {
            return "Could not add questions";
        }
    }

    // TO DO
    public String addAnswers(List<Answer> answers){
        Integer numRows = 0;
        String query = "INSERT INTO responses(question_id,complexity, time_use, difficulty, importance) VALUES (?,?,?,?,?)";
        for(Answer answer : answers){
            numRows = jdbcTemplate.update(query, answer.getQuestion_id(),
                    answer.getComplex(),
                    answer.getTime(),
                    answer.getDifficulity(),
                    answer.getImportance());
        }
        if (numRows == 1) {
            return null;
        } else {
            return "Could not add answers";
        }
    }
}
