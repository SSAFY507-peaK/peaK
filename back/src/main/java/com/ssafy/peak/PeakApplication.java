package com.ssafy.peak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class PeakApplication {

	public static void main(String[] args) {
		SpringApplication.run(PeakApplication.class, args);
	}

}
