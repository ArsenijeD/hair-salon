package com.example.hairsalon.dto;

import lombok.Data;


@Data
public class UserHairsalonServiceDTO {

    private Long id;

    private UserDTO user;

    private HairsalonServiceDTO hairsalonService;

    private Long percentage;
}
