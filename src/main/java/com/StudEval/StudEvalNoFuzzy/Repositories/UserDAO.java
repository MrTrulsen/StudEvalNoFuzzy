package com.StudEval.StudEvalNoFuzzy.Repositories;

import com.StudEval.StudEvalNoFuzzy.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;


public class UserDAO {
    public interface UserRepository extends JpaRepository<User, Long> {

        User findByUsername(String username);
    }
}
