package com.example.hairsalon.service.impl;

import com.example.hairsalon.model.FinalizedHairsalonService;
import com.example.hairsalon.model.Material;
import com.example.hairsalon.model.UsedMaterial;
import com.example.hairsalon.repository.UsedMaterialRepository;
import com.example.hairsalon.service.UsedMatierialService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UsedMaterialServiceImpl implements UsedMatierialService {

    private final UsedMaterialRepository usedMaterialRepository;

    public UsedMaterialServiceImpl(UsedMaterialRepository usedMaterialRepository) {
        this.usedMaterialRepository = usedMaterialRepository;
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
        return usedMaterialRepository.save(usedMaterial);
    }
}
