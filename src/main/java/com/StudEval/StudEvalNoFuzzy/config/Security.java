package com.StudEval.StudEvalNoFuzzy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@Configuration
public class Security extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.inMemoryAuthentication()
                .withUser("frode").password("password420").roles("STUDENT").roles("USER")
                .and()
                .withUser("arne").password("password69").roles("TEACHER").roles("USER");
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .authorizeRequests()
                .antMatchers("/teacherpage**").permitAll()//.hasRole("TEACHER")     // TODO: remove permitAll when done testing
                .antMatchers("/studentpage**").permitAll()//.hasRole("STUDENT")     // TODO: remove permitAll when done testing
                .antMatchers("/index**").permitAll()
                .antMatchers("/login**").permitAll()
                .antMatchers("/teacherlogin**").permitAll()
                .antMatchers("/studentlogin**").permitAll()
                //.anyRequest()
                //.permitAll()
                .and()
                //.httpBasic();
                .formLogin();
        httpSecurity.csrf().disable();
    }
}
