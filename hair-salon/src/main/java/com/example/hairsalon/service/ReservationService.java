package com.example.hairsalon.service;

import com.example.hairsalon.model.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface ReservationService {
    List<Reservation> getDailyReservations(LocalDate date);
    Reservation createReservation(Reservation reservation);
    Reservation updateReservation(Reservation reservation);
    void delete(Long id);
}
