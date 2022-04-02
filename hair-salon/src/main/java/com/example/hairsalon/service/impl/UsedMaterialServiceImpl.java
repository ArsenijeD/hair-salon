package com.example.hairsalon.service.impl;

import com.example.hairsalon.exception.MissingMaterialException;
import com.example.hairsalon.model.Material;
import com.example.hairsalon.model.UsedMaterial;
import com.example.hairsalon.repository.MaterialRepository;
import com.example.hairsalon.repository.UsedMaterialRepository;
import com.example.hairsalon.service.UsedMatierialService;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UsedMaterialServiceImpl implements UsedMatierialService {

    private final UsedMaterialRepository usedMaterialRepository;

    private final MaterialRepository materialRepository;

    private final ModelMapper modelMapper;

    public UsedMaterialServiceImpl(UsedMaterialRepository usedMaterialRepository, MaterialRepository materialRepository, ModelMapper modelMapper) {
        this.usedMaterialRepository = usedMaterialRepository;
        this.materialRepository = materialRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    public List<UsedMaterial> getAllForFinalizedService(Long finalizedServiceId) {
        List<UsedMaterial> usedMaterials = usedMaterialRepository.findAllByFinalizedHairsalonService_Id(finalizedServiceId)
                .orElseThrow(EntityNotFoundException::new);
        return usedMaterials;
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    public UsedMaterial createUsedMaterial(UsedMaterial usedMaterial) {
        checkForMissingMaterial(usedMaterial);
        return usedMaterialRepository.save(usedMaterial);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    public UsedMaterial updateUsedMaterial(UsedMaterial newUsedMaterial) {
        checkForMissingMaterial(newUsedMaterial);
        UsedMaterial oldUsedMaterial = usedMaterialRepository.findById(newUsedMaterial.getId()).orElseThrow(EntityNotFoundException::new);
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.map(newUsedMaterial, oldUsedMaterial);
        UsedMaterial updatedUsedMaterial = usedMaterialRepository.save(oldUsedMaterial);
        return updatedUsedMaterial;
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    public void delete(Long id) {
        this.usedMaterialRepository.deleteById(id);
    }

    private void checkForMissingMaterial(UsedMaterial usedMaterial) {
        Material material = materialRepository.findById(usedMaterial.getMaterial().getId()).orElseThrow(EntityNotFoundException::new);
        if (usedMaterial.getMaterialSpent() > material.getNumberInStock())
            throw new MissingMaterialException();
    }
}
