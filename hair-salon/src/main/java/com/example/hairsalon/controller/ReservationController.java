package com.example.hairsalon.controller;

import com.example.hairsalon.dto.ReservationDTO;
import com.example.hairsalon.model.Reservation;
import com.example.hairsalon.security.util.AuthenticationFacade;
import com.example.hairsalon.service.ReservationService;
import com.example.hairsalon.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

@RestController
@RequestMapping("reservations")
public class ReservationController {

    private final ReservationService reservationServiceImpl;

    private final UserService userServiceImpl;

    private final AuthenticationFacade authenticationFacadeImpl;

    private final ModelMapper modelMapper;

    public ReservationController(ReservationService reservationServiceImpl, UserService userServiceImpl, AuthenticationFacade authenticationFacadeImpl, ModelMapper modelMapper, ModelMapper modelMapper1) {
        this.reservationServiceImpl = reservationServiceImpl;
        this.userServiceImpl = userServiceImpl;
        this.authenticationFacadeImpl = authenticationFacadeImpl;
        this.modelMapper = modelMapper1;
    }


    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO) {
        Reservation reservation = modelMapper.map(reservationDTO, Reservation.class);
        reservation.setApproval(userServiceImpl.getByUserName(authenticationFacadeImpl.getAuthentication().getName()));
        Reservation created = reservationServiceImpl.createReservation(reservation);

        return ResponseEntity.ok().body(modelMapper.map(created, ReservationDTO.class));
    }

    @GetMapping("test")
    public String createReservation() {
        throw new NotImplementedException();
    }
}
