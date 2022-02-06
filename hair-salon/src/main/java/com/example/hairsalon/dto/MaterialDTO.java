package com.example.hairsalon.dto;

import lombok.Data;

@Data
public class MaterialDTO {

    private Long id;

    private String name;

    private String brand;

    private double price;

    private double numberInStock;

}
