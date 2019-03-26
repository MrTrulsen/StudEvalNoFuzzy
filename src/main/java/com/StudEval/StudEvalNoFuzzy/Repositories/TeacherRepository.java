package com.StudEval.StudEvalNoFuzzy.Repositories;

import com.StudEval.StudEvalNoFuzzy.Evaluation.Answer;
import com.StudEval.StudEvalNoFuzzy.RowMappers.CourseIdRowMapper;
import com.StudEval.StudEvalNoFuzzy.User.Student;
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


    public List<String> findStudentEmailsInDb() {
        List<String> emails = new ArrayList<>();
        String query = "SELECT email FROM user";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(query);
        if (rs.first()) {
            String studentEmail = rs.getString("email");
            emails.add(studentEmail);
        }
        while (rs.next()) {
            String studentEmail = rs.getString("email");
            emails.add(studentEmail);
        }
        return emails;
    }

    public String importStudentsToCourse(List<Student> students, String course_id) {
        List<String> studentEmailsInDb = findStudentEmailsInDb();
        int numRows = 0;
        for (Student student : students) {
            if (!studentEmailsInDb.contains(student.getEmail())) {
                addUser(student);
            }
            String query = "REPLACE INTO course_stud_junc(user_id,course_id) VALUES(?,?)";
            try {
                numRows = jdbcTemplate.update(query, student.getStudent_id(), course_id);

            } catch (Exception ex) {
                return "Could not add students: " + ex.getMessage();
            }
        }
        if(numRows == 1){
            return null;
        }
        else {
            return "Could not add students right.";
        }
    }

    public void addUser(Student student) {
        String query = "INSERT INTO user (email) VALUES (?)";
        try {
            jdbcTemplate.update(query, student.getEmail());
        } catch (Exception ex) {
            throw ex;
        }
    }

}
