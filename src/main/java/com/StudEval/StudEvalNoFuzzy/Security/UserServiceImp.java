package com.StudEval.StudEvalNoFuzzy.Security;

import com.StudEval.StudEvalNoFuzzy.Repositories.RoleRepository;
import com.StudEval.StudEvalNoFuzzy.Repositories.UserRepository;
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

    @Override
    public void saveUser(User user) {
        try {
            user.setPassword(encoder.encode(user.getPassword()));
            user.setStatus("VERIFIED");
            Role userRole = roleRepository.findByRole("TEACHER_USER");
            user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
            userRepository.save(user);
        }catch (Exception e){
            System.out.println(e);
        }
    }

    @Override
    public boolean isUserAlreadyPresent(User user) {
        // Try to implement this method, as assignment.
        return false;
    }

}
