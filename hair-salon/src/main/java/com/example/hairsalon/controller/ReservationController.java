package com.example.hairsalon.controller;

import com.example.hairsalon.dto.ReservationDTO;
import com.example.hairsalon.model.Reservation;
import com.example.hairsalon.security.util.AuthenticationFacade;
import com.example.hairsalon.service.ReservationService;
import com.example.hairsalon.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("reservations")
public class ReservationController {

    private final ReservationService reservationServiceImpl;

    private final UserService userServiceImpl;

    private final AuthenticationFacade authenticationFacadeImpl;

    private final ModelMapper modelMapper;


    public ReservationController(ReservationService reservationServiceImpl, UserService userServiceImpl, AuthenticationFacade authenticationFacadeImpl, ModelMapper modelMapper) {
        this.reservationServiceImpl = reservationServiceImpl;
        this.userServiceImpl = userServiceImpl;
        this.authenticationFacadeImpl = authenticationFacadeImpl;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<ReservationDTO>> getDailyReservations(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Reservation> reservations = reservationServiceImpl.getDailyReservations(date);
        return ResponseEntity.ok().body(modelMapper.map(reservations, new TypeToken<List<ReservationDTO>>(){}.getType()));
    }

    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO) {
        //TODO Validate id only to be enabled in reservation response (for both update and insert)
        Reservation reservation = convertDtoToEntity(reservationDTO);
        Reservation created = reservationServiceImpl.createReservation(reservation);
        return ResponseEntity.ok().body(modelMapper.map(created, ReservationDTO.class));
    }

    @PutMapping("{id}")
    public ResponseEntity<ReservationDTO> updateReservation(@PathVariable Long id, @RequestBody ReservationDTO reservationDTO) {
        Reservation reservation = convertDtoToEntity(reservationDTO);
        reservation.setId(id);
        Reservation updated = reservationServiceImpl.updateReservation(reservation);
        return ResponseEntity.ok().body(modelMapper.map(updated, ReservationDTO.class));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationServiceImpl.delete(id);
        return ResponseEntity.noContent().build();
    }

    private Reservation convertDtoToEntity(ReservationDTO reservationDTO) {
        Reservation reservation = modelMapper.map(reservationDTO, Reservation.class);
        reservation.setApproval(userServiceImpl.getByUserName(authenticationFacadeImpl.getAuthentication().getName()));
        return reservation;
    }

}
