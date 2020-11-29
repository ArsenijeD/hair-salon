package com.example.hairsalon.repository;

import com.example.hairsalon.model.Holiday;
import com.example.hairsalon.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.time.MonthDay;
import java.util.List;
import java.util.Optional;

public interface ReservationRespository extends JpaRepository<Reservation, Long> {
    Optional<List<Reservation>> findByDate(LocalDateTime date);
    Optional<List<Reservation>> findAllByWorker_IdAndDateBetween(Long workerId, LocalDateTime startDate, LocalDateTime endDate);

}
