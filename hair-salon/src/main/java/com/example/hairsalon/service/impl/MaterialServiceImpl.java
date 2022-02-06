package com.example.hairsalon.service.impl;

import com.example.hairsalon.model.HairsalonService;
import com.example.hairsalon.model.Material;
import com.example.hairsalon.repository.MaterialRepository;
import com.example.hairsalon.service.MaterialService;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepository materialRepository;
    private final ModelMapper modelMapper;

    public MaterialServiceImpl(MaterialRepository materialRepository, ModelMapper modelMapper) {
        this.materialRepository = materialRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN)")
    @Transactional
    public List<Material> getAll() {
        List<Material> materials = materialRepository.findAll();
        if (materials.isEmpty()) {
            throw new EntityNotFoundException();
        } else {
            return materials;
        }
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN)")
    @Transactional
    public Material createMaterial(Material material) {
        return materialRepository.save(material);
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN)")
    @Transactional
    public Material updateMaterial(Material newMaterial) {
        Material oldMaterial = materialRepository.findById(newMaterial.getId()).orElseThrow(EntityNotFoundException::new);
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.map(newMaterial, oldMaterial);
        Material updatedMaterial = materialRepository.save(oldMaterial);
        return updatedMaterial;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN)")
    @Transactional
    public void delete(Long id) {
        this.materialRepository.deleteById(id);
    }
}
