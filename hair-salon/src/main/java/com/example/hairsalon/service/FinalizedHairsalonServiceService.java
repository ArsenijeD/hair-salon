package com.example.hairsalon.service;

import com.example.hairsalon.model.FinalizedHairsalonService;
import com.example.hairsalon.model.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface FinalizedHairsalonServiceService {
    List<FinalizedHairsalonService> getWorkersDailyFinalizedServices(Long workerId, LocalDate date);
    FinalizedHairsalonService createFinalizedHairsalonService(FinalizedHairsalonService finalizedHairsalonService);
    FinalizedHairsalonService updateFinalizedHairsalonService(FinalizedHairsalonService finalizedHairsalonService);
    void delete(Long id);


}
