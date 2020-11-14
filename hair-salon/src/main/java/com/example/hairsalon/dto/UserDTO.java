package com.example.hairsalon.dto;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String username;

    //TODO Add DTO-fields validation (javax.validation.constraints)
}
