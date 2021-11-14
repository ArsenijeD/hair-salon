package com.example.hairsalon;

import org.modelmapper.ModelMapper;
import org.passay.PasswordGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.reactive.function.client.WebClient;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableScheduling
//TODO Move this swagger annotation to another spring configuration bean
@EnableSwagger2
public class HairSalonApplication {

	public static void main(String[] args) {
		SpringApplication.run(HairSalonApplication.class, args);
	}

	//TODO Consider moving this definitions to util services (to not be tightly coupled)

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Bean
	public WebClient.Builder webClientBuilder() {
		return WebClient.builder();
	}

	@Bean
	PasswordGenerator passwordGenerator() { return new PasswordGenerator(); }

	//TODO Consider making conversion adapter; benefit: third-party-lib independent(both from controllers and from here)
}
