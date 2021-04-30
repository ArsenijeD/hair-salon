package com.example.hairsalon.dto;

import com.example.hairsalon.model.Length;
import com.example.hairsalon.model.TypeOfService;
import lombok.Data;

@Data
public class HairsalonServiceDTO {

    private Long id;

    private TypeOfService name;

    private Length length;

    private double price;

}
