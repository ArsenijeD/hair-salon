package com.example.hairsalon.controller;

import com.example.hairsalon.dto.ReservationDTO;
import com.example.hairsalon.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

@RestController
@RequestMapping("reservations")
public class ReservationController {

    private final ReservationService reservationServiceImpl;

    public ReservationController(ReservationService reservationServiceImpl) {
        this.reservationServiceImpl = reservationServiceImpl;
    }


    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(ReservationDTO reservationDTO) {
        throw new NotImplementedException();
    }

    @GetMapping("test")
    public String createReservation() {
        return reservationServiceImpl.createReservation();
    }
}
