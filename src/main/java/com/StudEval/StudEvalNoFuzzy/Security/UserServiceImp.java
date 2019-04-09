package com.StudEval.StudEvalNoFuzzy.Security;

import com.StudEval.StudEvalNoFuzzy.Interfaces.RoleRepository;
import com.StudEval.StudEvalNoFuzzy.Interfaces.UserRepository;
import com.StudEval.StudEvalNoFuzzy.Interfaces.UserService;
import com.StudEval.StudEvalNoFuzzy.Interfaces.VerificationTokenRepository;
import com.StudEval.StudEvalNoFuzzy.User.Role;
import com.StudEval.StudEvalNoFuzzy.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    BCryptPasswordEncoder encoder;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    VerificationTokenRepository tokenRepository;


    @Override
    public void saveUser(User user) {
        try {
            user.setPassword(encoder.encode(user.getPassword()));
            user.setStatus(0);
            Role userRole = roleRepository.findByRole("TEACHER_USER");
            user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
            userRepository.save(user);
        }catch (Exception e){
            System.out.println(e);
        }
    }

    @Override
    public boolean isUserAlreadyPresent(User user) {
        User foundUser =  userRepository.findByEmail(user.getEmail());
        return foundUser != null;
    }

    @Override
    public boolean isPasswordConfirmationValid(User user){
        return user.getPassword().equals(user.getPasswordConfirm());
    }

    @Override
    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(token, user);
        tokenRepository.save(myToken);
    }


    @Override
    public VerificationToken getVerificationToken(String VerificationToken) {
        return null;
    }

}
