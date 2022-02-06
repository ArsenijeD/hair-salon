package com.example.hairsalon.controller;

import com.example.hairsalon.dto.MaterialDTO;
import com.example.hairsalon.model.Material;
import com.example.hairsalon.service.MaterialService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("materials")
public class MaterialController {
    private final MaterialService materialServiceImpl;

    private final ModelMapper modelMapper;

    public MaterialController(MaterialService materialServiceImpl, ModelMapper modelMapper) {
        this.materialServiceImpl = materialServiceImpl;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<MaterialDTO>> getMaterials() {
        List<Material> materials = materialServiceImpl.getAll();
        return ResponseEntity.ok().body(modelMapper.map(materials, new TypeToken<List<MaterialDTO>>(){}.getType()));
    }

    @PostMapping
    public ResponseEntity<MaterialDTO> createMaterial(@RequestBody MaterialDTO materialDTO) {
        Material material = modelMapper.map(materialDTO, Material.class);
        Material created = materialServiceImpl.createMaterial(material);
        return ResponseEntity.ok().body(modelMapper.map(created, MaterialDTO.class));
    }

    @PutMapping("{id}")
    public ResponseEntity<MaterialDTO> updateMaterial(@PathVariable Long id, @RequestBody MaterialDTO materialDTO) {
        Material material = modelMapper.map(materialDTO, Material.class);
        material.setId(id);
        Material updated = materialServiceImpl.updateMaterial(material);
        return ResponseEntity.ok().body(modelMapper.map(updated, MaterialDTO.class));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long id) {
        materialServiceImpl.delete(id);
        return ResponseEntity.noContent().build();
    }
}
