package com.example.hairsalon.service;

import com.example.hairsalon.model.UserHairsalonService;

import java.util.List;

public interface UserHairsalonServiceService {
    List<UserHairsalonService> getWorkersProfitPerService(Long workerId);
    UserHairsalonService createWorkersHairsalonService(UserHairsalonService userHairsalonService);
    UserHairsalonService updateWorkersPercentagePerService(Long workerId, Long hairsalonServiceId, Long percentage);
    void deleteWorkersHairsalonService(Long workerId, Long hairsalonServiceId);
}
