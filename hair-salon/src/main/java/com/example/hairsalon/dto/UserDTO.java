package com.example.hairsalon.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String username;

    private LocalDateTime dateOfBirth;

    private String phoneNumber;

    private String gender;

    private List<AuthorityDTO> userAuthorities;

    //TODO Add DTO-fields validation (javax.validation.constraints)
}
