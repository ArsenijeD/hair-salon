package com.example.hairsalon.repository;

import com.example.hairsalon.model.FinalizedHairsalonService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface FinalizedHairsalonServiceRepository extends JpaRepository<FinalizedHairsalonService, Long> {
    Optional<List<FinalizedHairsalonService>> findAllByUserHairsalonService_User_IdAndDateBetween(Long userId, LocalDateTime startDate, LocalDateTime endDate);

}
