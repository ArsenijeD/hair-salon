package com.example.hairsalon.service;

import com.example.hairsalon.dto.UsedMaterialDTO;
import com.example.hairsalon.model.FinalizedHairsalonService;
import com.example.hairsalon.model.UsedMaterial;

import java.util.List;

public interface UsedMatierialService {
    List<UsedMaterial> getAllForFinalizedService(Long finalizedServiceId);
    UsedMaterial createUsedMaterial(UsedMaterial usedMaterial);
    UsedMaterial updateUsedMaterial(UsedMaterial usedMaterial);
    void delete(Long id);
}
