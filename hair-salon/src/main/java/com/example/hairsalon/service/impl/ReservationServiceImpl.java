package com.example.hairsalon.service.impl;

import com.example.hairsalon.amqp.configuration.RabbitMQConfiguration;
import com.example.hairsalon.amqp.dto.SmsDTO;
import com.example.hairsalon.amqp.publisher.MessagePublisher;
import com.example.hairsalon.model.Reservation;
import com.example.hairsalon.repository.ReservationRespository;
import com.example.hairsalon.service.ReservationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRespository reservationRespository;

    private final MessagePublisher messagePublisher;

    public ReservationServiceImpl(ReservationRespository reservationRespository, MessagePublisher messagePublisher) {
        this.reservationRespository = reservationRespository;
        this.messagePublisher = messagePublisher;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public Reservation createReservation(Reservation reservation) {
        Reservation savedReservation = reservationRespository.save(reservation);
        //TODO Move message content to the database
        SmsDTO smsDTO = new SmsDTO(reservation.getCustomer().getPhoneNumber(), "Vasa rezervacija je uspesno zakazana.");
        messagePublisher.enqueue(smsDTO, RabbitMQConfiguration.CONFIRMATION_ROUTING_KEY);
        return savedReservation;
    }

}
