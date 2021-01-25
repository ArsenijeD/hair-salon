package com.example.hairsalon.dto;

import com.example.hairsalon.model.Length;
import lombok.Data;

@Data
public class TypeOfServiceDTO {

    private Long id;

    private String name;

    private Length length;

    private double price;

}
