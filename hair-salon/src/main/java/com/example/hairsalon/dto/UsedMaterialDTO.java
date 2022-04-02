package com.example.hairsalon.dto;

import com.example.hairsalon.model.Material;
import lombok.Data;

@Data
public class UsedMaterialDTO {

    private Long id;

    private Material material;

    private double materialSpent;

    private FinalizedHairsalonServiceDTO finalizedHairsalonService;
}
