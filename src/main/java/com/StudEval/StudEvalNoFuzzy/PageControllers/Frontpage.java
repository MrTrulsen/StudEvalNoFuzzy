package com.StudEval.StudEvalNoFuzzy.PageControllers;

import com.StudEval.StudEvalNoFuzzy.Interfaces.RoleRepository;
import com.StudEval.StudEvalNoFuzzy.Interfaces.UserService;
import com.StudEval.StudEvalNoFuzzy.RestControllers.MainRestController;
import com.StudEval.StudEvalNoFuzzy.User.Role;
import com.StudEval.StudEvalNoFuzzy.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.HashSet;

@Controller
public class Frontpage {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    MainRestController mainRestController;

    @Autowired
    UserService userService;

    @RequestMapping(value = "/login")
    public String studentLogin(){
            return "login";
    }


    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public ModelAndView register() {
        ModelAndView modelAndView = new ModelAndView();
        User user = new User();
        modelAndView.addObject("user", user);
        modelAndView.setViewName("register");
        return modelAndView;
    }

    @RequestMapping(value="/register", method = RequestMethod.POST)
    public ModelAndView registerUser(@Valid User user, BindingResult bindingResult, ModelMap modelMap) {
        ModelAndView modelAndView = new ModelAndView();
        mainRestController.isUserActive(user.getEmail());
        // Check for the validations
        if(bindingResult.hasErrors()) {
            modelAndView.addObject("errorMessage", "Please correct the errors in form!");
            modelMap.addAttribute("bindingResult", bindingResult);
        }
        else if(userService.isUserAlreadyPresent(user)){
            if(mainRestController.isUserActive(user.getEmail()) == false) {
                mainRestController.registerNewPassword(user);
                modelAndView.addObject("successMessage", "User is registered successfully!");
            }
                else{
                    modelAndView.addObject("errorMessage", "user already exists!");
                }
        }
        // we will save the user if, no binding errors
        else if (!userService.isPasswordConfirmationValid(user)){
            modelAndView.addObject("errorMessage", "password failed to be repeated!");
        }
        else if(!user.getEmail().endsWith("ntnu.no")){
            modelAndView.addObject("errorMessage", "user email not ending with ntnu.no!");
        }
        else if(user.getEmail().endsWith("@stud.ntnu.no")){
            Role userRole = roleRepository.findByRole("STUDENT_USER");
            user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
            userService.saveUser(user);
            modelAndView.addObject("successMessage", "User is registered successfully!");
        }
        else if(user.getEmail().endsWith("@ntnu.no")){
            Role userRole = roleRepository.findByRole("TEACHER_USER");
            user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
            userService.saveUser(user);
            modelAndView.addObject("successMessage", "User is registered successfully!");
        }
        modelAndView.addObject("user", new User());
        modelAndView.setViewName("register");
        return modelAndView;
    }
}
