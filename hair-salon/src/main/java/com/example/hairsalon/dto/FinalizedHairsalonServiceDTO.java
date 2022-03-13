package com.example.hairsalon.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FinalizedHairsalonServiceDTO {

    private Long id;

    private LocalDateTime date;

    private UserDTO customer;

    private UserHairsalonServiceDTO userHairsalonService;
}
