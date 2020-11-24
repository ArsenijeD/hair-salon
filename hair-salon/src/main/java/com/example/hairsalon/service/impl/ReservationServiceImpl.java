package com.example.hairsalon.service.impl;

import com.example.hairsalon.amqp.configuration.RabbitMQConfiguration;
import com.example.hairsalon.amqp.dto.SmsDTO;
import com.example.hairsalon.amqp.publisher.MessagePublisher;
import com.example.hairsalon.exception.SmsContentNotFoundException;
import com.example.hairsalon.model.Reservation;
import com.example.hairsalon.model.SmsContent;
import com.example.hairsalon.model.SmsType;
import com.example.hairsalon.repository.ReservationRespository;
import com.example.hairsalon.repository.SmsContentRepository;
import com.example.hairsalon.service.ReservationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.text.MessageFormat;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

@Service
public class ReservationServiceImpl implements ReservationService {

    private static final String SERBIAN_LANGUAGE_TAG = "sr-Latn-RS";

    private static final String DAY_MONTH_DATE_FORMAT = "dd.MM";

    private static final String HOURS_MINUTES_DATE_FORMAT = "HH:mm";

    private final ReservationRespository reservationRespository;

    private final SmsContentRepository smsContentRepository;

    private final MessagePublisher messagePublisher;

    public ReservationServiceImpl(ReservationRespository reservationRespository, SmsContentRepository smsContentRepository, MessagePublisher messagePublisher) {
        this.reservationRespository = reservationRespository;
        this.smsContentRepository = smsContentRepository;
        this.messagePublisher = messagePublisher;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public Reservation createReservation(Reservation reservation) {
        Reservation savedReservation = reservationRespository.save(reservation);
        SmsContent smsContent = smsContentRepository.findByType(SmsType.CONFIRMATION).orElseThrow(SmsContentNotFoundException::new);
        String dayOfWeek = savedReservation.getDate().getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.forLanguageTag(SERBIAN_LANGUAGE_TAG));
        String dayMonth = savedReservation.getDate().format(DateTimeFormatter.ofPattern(DAY_MONTH_DATE_FORMAT));
        String hoursMinutes = savedReservation.getDate().format(DateTimeFormatter.ofPattern(HOURS_MINUTES_DATE_FORMAT));
        String employeeName = savedReservation.getWorker().getFirstName();
        SmsDTO smsDTO = new SmsDTO(reservation.getCustomer().getPhoneNumber(), MessageFormat.format(smsContent.getContent(), dayOfWeek, dayMonth, hoursMinutes, employeeName));
        messagePublisher.enqueue(smsDTO, RabbitMQConfiguration.CONFIRMATION_ROUTING_KEY);
        return savedReservation;
    }

}
