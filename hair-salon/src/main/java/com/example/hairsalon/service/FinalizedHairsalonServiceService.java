package com.example.hairsalon.service;

import com.example.hairsalon.model.FinalizedHairsalonService;

import java.time.LocalDate;
import java.util.List;

public interface FinalizedHairsalonServiceService {
    List<FinalizedHairsalonService> getWorkersDailyFinalizedServices(Long workerId, LocalDate date);

}
