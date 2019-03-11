package com.StudEval.StudEvalNoFuzzy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication( scanBasePackages = { "com.StudEval.StudEvalNoFuzzy.Repositories", "com.StudEval.StudEvalNoFuzzy.config","com.StudEval.StudEvalNoFuzzy.RestControllers"})
public class StudEvalNoFuzzyApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudEvalNoFuzzyApplication.class, args);
	}

}
