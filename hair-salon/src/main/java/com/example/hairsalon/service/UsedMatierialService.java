package com.example.hairsalon.service;

import com.example.hairsalon.model.UsedMaterial;

import java.util.List;

public interface UsedMatierialService {
    List<UsedMaterial> getAllForFinalizedService(Long finalizedServiceId);

}
