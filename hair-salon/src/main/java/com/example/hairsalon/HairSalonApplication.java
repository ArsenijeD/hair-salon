package com.example.hairsalon;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HairSalonApplication {

	public static void main(String[] args) {
		SpringApplication.run(HairSalonApplication.class, args);
	}

	//TODO Consider making config class for bean definitions
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	//TODO Consider making conversion adapter; benefit: third-party-lib independent(both from controllers and from here)
}
