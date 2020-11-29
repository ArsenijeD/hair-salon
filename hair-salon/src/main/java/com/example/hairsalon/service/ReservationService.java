package com.example.hairsalon.service;

import com.example.hairsalon.model.Reservation;

public interface ReservationService {
    Reservation createReservation(Reservation reservation);
    Reservation updateReservation(Reservation reservation);
    void delete(Long id);
}
