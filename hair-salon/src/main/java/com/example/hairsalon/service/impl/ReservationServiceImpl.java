package com.example.hairsalon.service.impl;

import com.example.hairsalon.service.ReservationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    public String createReservation() {
        return "Reservation endpoint successfully reached.";
    }
}
