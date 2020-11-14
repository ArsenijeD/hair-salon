package com.example.hairsalon.controller;

import com.example.hairsalon.dto.ReservationDTO;
import com.example.hairsalon.security.util.AuthenticationFacade;
import com.example.hairsalon.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

@RestController
@RequestMapping("reservations")
public class ReservationController {

    private final ReservationService reservationServiceImpl;

    private final AuthenticationFacade authenticationFacadeImpl;

    public ReservationController(ReservationService reservationServiceImpl, AuthenticationFacade authenticationFacadeImpl) {
        this.reservationServiceImpl = reservationServiceImpl;
        this.authenticationFacadeImpl = authenticationFacadeImpl;
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
