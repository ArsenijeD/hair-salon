package com.example.hairsalon.repository;

import com.example.hairsalon.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRespository extends JpaRepository<Reservation, Long> {
}
