package com.StudEval.StudEvalNoFuzzy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication( scanBasePackages = { "com.StudEval.StudEvalNoFuzzy.*"})
public class StudEvalNoFuzzyApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudEvalNoFuzzyApplication.class, args);
	}

}
