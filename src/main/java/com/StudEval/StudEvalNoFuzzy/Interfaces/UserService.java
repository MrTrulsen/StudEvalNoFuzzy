package com.StudEval.StudEvalNoFuzzy.Interfaces;

import com.StudEval.StudEvalNoFuzzy.Security.VerificationToken;
import com.StudEval.StudEvalNoFuzzy.User.User;

public interface UserService {

    public void saveUser(User user);

    public boolean isUserAlreadyPresent(User user);

    boolean isPasswordConfirmationValid(User user);

    void createVerificationToken(User user, String token);

    VerificationToken getVerificationToken(String VerificationToken);
}