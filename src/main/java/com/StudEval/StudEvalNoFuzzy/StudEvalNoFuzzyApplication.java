package com.StudEval.StudEvalNoFuzzy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication( scanBasePackages = { "com.StudEval.StudEvalNoFuzzy.Repositories", "com.StudEval.StudEvalNoFuzzy.config"})
public class StudEvalNoFuzzyApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudEvalNoFuzzyApplication.class, args);
	}

}
