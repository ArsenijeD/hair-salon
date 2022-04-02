package com.example.hairsalon.service.impl;

import com.example.hairsalon.amqp.dto.SmsDTO;
import com.example.hairsalon.exception.SmsContentNotFoundException;
import com.example.hairsalon.model.*;
import com.example.hairsalon.repository.FinalizedHairsalonServiceRepository;
import com.example.hairsalon.service.FinalizedHairsalonServiceService;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
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

    private final ModelMapper modelMapper;

    public FinalizedHairsalonServiceServiceImpl(FinalizedHairsalonServiceRepository finalizedHairsalonServiceRepository, ModelMapper modelMapper) {
        this.finalizedHairsalonServiceRepository = finalizedHairsalonServiceRepository;
        this.modelMapper = modelMapper;
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

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public FinalizedHairsalonService createFinalizedHairsalonService(FinalizedHairsalonService finalizedHairsalonService) {
        finalizedHairsalonService.setDate(finalizedHairsalonService.getDate().withSecond(0).withNano(0));
        FinalizedHairsalonService savedFinalizedHairsalonService = finalizedHairsalonServiceRepository.save(finalizedHairsalonService);
        return savedFinalizedHairsalonService;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public FinalizedHairsalonService updateFinalizedHairsalonService(FinalizedHairsalonService newFinalizedHairsalonService) {
        FinalizedHairsalonService oldFinalizedHairsalonService = finalizedHairsalonServiceRepository.findById(newFinalizedHairsalonService.getId()).orElseThrow(EntityNotFoundException::new);
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.map(newFinalizedHairsalonService, oldFinalizedHairsalonService);
        FinalizedHairsalonService updatedFinalizedHairsalonService = finalizedHairsalonServiceRepository.save(oldFinalizedHairsalonService);
        return updatedFinalizedHairsalonService;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public void delete(Long id) {
        FinalizedHairsalonService finalizedHairsalonService = this.finalizedHairsalonServiceRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        this.finalizedHairsalonServiceRepository.deleteById(id);
    }
}
