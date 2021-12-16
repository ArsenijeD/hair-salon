package com.example.hairsalon.repository;

import com.example.hairsalon.model.UserHairsalonService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserHairsalonServiceRepository extends JpaRepository<UserHairsalonService, Long> {
    Optional<List<UserHairsalonService>> findAllByUserId(Long userId);
    Optional<UserHairsalonService> findOneByUserIdAndHairsalonServiceId(Long userId, Long hairsalonServiceId);
    void deleteByUserIdAndHairsalonServiceId(Long userId, Long hairsalonServiceId);
}
