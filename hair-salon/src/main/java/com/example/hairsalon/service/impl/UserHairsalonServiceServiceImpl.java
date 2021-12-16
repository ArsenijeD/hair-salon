package com.example.hairsalon.service.impl;

import com.example.hairsalon.model.UserHairsalonService;
import com.example.hairsalon.repository.UserHairsalonServiceRepository;
import com.example.hairsalon.service.UserHairsalonServiceService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UserHairsalonServiceServiceImpl implements UserHairsalonServiceService {

    private final UserHairsalonServiceRepository userHairsalonServiceRepository;

    public UserHairsalonServiceServiceImpl(UserHairsalonServiceRepository userHairsalonServiceRepository) {
        this.userHairsalonServiceRepository = userHairsalonServiceRepository;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN)")
    @Transactional
    public List<UserHairsalonService> getWorkersProfitPerService(Long workerId) {
        List<UserHairsalonService> userHairsalonServices = userHairsalonServiceRepository.findAllByUserId(workerId)
                .orElseThrow(EntityNotFoundException::new);
        return userHairsalonServices;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN)")
    @Transactional
    public UserHairsalonService createWorkersHairsalonService(UserHairsalonService userHairsalonService) {
        return userHairsalonServiceRepository.save(userHairsalonService);
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN)")
    @Transactional
    public UserHairsalonService updateWorkersPercentagePerService(Long workerId, Long hairsalonServiceId, Long percentage) {
        UserHairsalonService userHairsalonService = this.userHairsalonServiceRepository.findOneByUserIdAndHairsalonServiceId(workerId, hairsalonServiceId)
                .orElseThrow(EntityNotFoundException::new);
        userHairsalonService.setPercentage(percentage);
        return this.userHairsalonServiceRepository.save(userHairsalonService);
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN)")
    @Transactional
    public void deleteWorkersHairsalonService(Long workerId, Long hairsalonServiceId) {
        this.userHairsalonServiceRepository.deleteByUserIdAndHairsalonServiceId(workerId, hairsalonServiceId);
    }
}
