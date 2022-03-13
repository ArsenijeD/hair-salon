package com.example.hairsalon.repository;

import com.example.hairsalon.model.UsedMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsedMaterialRepository extends JpaRepository<UsedMaterial, Long> {
    Optional<List<UsedMaterial>> findAllByFinalizedHairsalonService_Id(Long finalizedServiceId);

}
