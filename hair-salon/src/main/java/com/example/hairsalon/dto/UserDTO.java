package com.example.hairsalon.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String username;

    private Date dateOfBirth;

    private String phoneNumber;

    private String gender;

    //TODO Add DTO-fields validation (javax.validation.constraints)
}
