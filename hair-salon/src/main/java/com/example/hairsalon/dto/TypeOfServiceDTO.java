package com.example.hairsalon.dto;

import com.example.hairsalon.model.Type;
import lombok.Data;

@Data
public class TypeOfServiceDTO {

    private Long id;

    private String name;

    private Type type;

    private double price;

}
