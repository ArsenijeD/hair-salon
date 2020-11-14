package com.example.hairsalon.service.impl;

import com.example.hairsalon.model.Reservation;
import com.example.hairsalon.repository.ReservationRespository;
import com.example.hairsalon.service.ReservationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRespository reservationRespository;

    public ReservationServiceImpl(ReservationRespository reservationRespository) {
        this.reservationRespository = reservationRespository;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public Reservation createReservation(Reservation reservation) {
        return reservationRespository.save(reservation);
    }

}
