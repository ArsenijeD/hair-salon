package com.example.hairsalon.dto;

import com.example.hairsalon.model.Role;
import lombok.Data;

@Data
public class AuthorityDTO {

    private Long id;

    private Role name;
}
