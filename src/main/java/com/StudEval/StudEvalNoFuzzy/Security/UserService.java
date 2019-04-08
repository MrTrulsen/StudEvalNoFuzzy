package com.StudEval.StudEvalNoFuzzy.Security;

import com.StudEval.StudEvalNoFuzzy.User.User;

public interface UserService {

    public void saveUser(User user);

    public boolean isUserAlreadyPresent(User user);

    boolean isPasswordConfirmationValid(User user);
}