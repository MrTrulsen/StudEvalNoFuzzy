package com.StudEval.StudEvalNoFuzzy.Interfaces;

import com.StudEval.StudEvalNoFuzzy.Security.VerificationToken;
import com.StudEval.StudEvalNoFuzzy.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);

    VerificationToken findByUser(User user);
}
