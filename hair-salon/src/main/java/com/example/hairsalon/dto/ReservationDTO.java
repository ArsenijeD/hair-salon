package com.example.hairsalon.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationDTO {

    private Long id;

    private LocalDateTime date;

    private UserDTO customer;

    private UserDTO worker;

    private TypeOfServiceDTO typeOfService;
}