package com.example.hairsalon;

import com.example.hairsalon.configuration.SecurityConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class HairSalonApplication {

	public static void main(String[] args) {
		SpringApplication.run(HairSalonApplication.class, args);
	}

}
