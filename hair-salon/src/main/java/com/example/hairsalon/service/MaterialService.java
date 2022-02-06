package com.example.hairsalon.service;

import com.example.hairsalon.model.HairsalonService;
import com.example.hairsalon.model.Material;

import java.util.List;

public interface MaterialService {
    List<Material> getAll();
    Material createMaterial(Material material);
    Material updateMaterial(Material material);
    void delete(Long id);
}
