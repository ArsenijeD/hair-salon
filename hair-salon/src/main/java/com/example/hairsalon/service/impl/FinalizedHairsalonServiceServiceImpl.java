package com.example.hairsalon.service.impl;

import com.example.hairsalon.model.FinalizedHairsalonService;
import com.example.hairsalon.repository.FinalizedHairsalonServiceRepository;
import com.example.hairsalon.service.FinalizedHairsalonServiceService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FinalizedHairsalonServiceServiceImpl implements FinalizedHairsalonServiceService {

    private final FinalizedHairsalonServiceRepository finalizedHairsalonServiceRepository;

    public FinalizedHairsalonServiceServiceImpl(FinalizedHairsalonServiceRepository finalizedHairsalonServiceRepository) {
        this.finalizedHairsalonServiceRepository = finalizedHairsalonServiceRepository;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public List<FinalizedHairsalonService> getWorkersDailyFinalizedServices(Long workerId, LocalDate date) {
        LocalDateTime startDate = date.atStartOfDay();
        LocalDateTime endDate = startDate.plusDays(1);
        List<FinalizedHairsalonService> finalizedHairsalonServices = finalizedHairsalonServiceRepository.findAllByUserHairsalonService_User_IdAndDateBetween(workerId, startDate, endDate)
                .orElseThrow(EntityNotFoundException::new);
        return finalizedHairsalonServices;
    }
}
