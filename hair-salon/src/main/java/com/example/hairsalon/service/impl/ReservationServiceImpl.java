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
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

@Service
public class ReservationServiceImpl implements ReservationService {

    private static final String SERBIAN_LANGUAGE_TAG = "sr-Latn-RS";

    private static final String DAY_MONTH_DATE_FORMAT = "dd.MM";

    private static final String HOURS_MINUTES_DATE_FORMAT = "HH:mm";

    private final ReservationRespository reservationRespository;

    private final SmsContentRepository smsContentRepository;

    private final MessagePublisher messagePublisher;

    private final ModelMapper modelMapper;

    public ReservationServiceImpl(ReservationRespository reservationRespository, SmsContentRepository smsContentRepository, MessagePublisher messagePublisher, ModelMapper modelMapper) {
        this.reservationRespository = reservationRespository;
        this.smsContentRepository = smsContentRepository;
        this.messagePublisher = messagePublisher;
        this.modelMapper = modelMapper;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public List<Reservation> getWorkersDailyReservations(Long workerId, LocalDate date) {
        LocalDateTime startDate = date.atStartOfDay();
        LocalDateTime endDate = startDate.plusDays(1);
        List<Reservation> reservations = reservationRespository.findAllByWorker_IdAndDateBetween(workerId, startDate, endDate)
                .orElseThrow(EntityNotFoundException::new);
        return reservations;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public Reservation createReservation(Reservation reservation) {
        //TODO Consider configuring LocaleDateTime persistence format instead of manually setting seconds to zero
        reservation.setDate(reservation.getDate().withSecond(0).withNano(0));
        Reservation savedReservation = reservationRespository.save(reservation);
        SmsDTO smsDTO = createSmsDTO(savedReservation);
//        messagePublisher.enqueue(smsDTO, RabbitMQConfiguration.CONFIRMATION_ROUTING_KEY);
        return savedReservation;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public Reservation updateReservation(Reservation newReservation) {
        Reservation oldReservation = reservationRespository.findById(newReservation.getId()).orElseThrow(EntityNotFoundException::new);
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.map(newReservation, oldReservation);
        Reservation updatedReservation = reservationRespository.save(oldReservation);
        SmsDTO smsDTO = createSmsDTO(oldReservation);
        messagePublisher.enqueue(smsDTO, RabbitMQConfiguration.CONFIRMATION_ROUTING_KEY);
        return updatedReservation;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public void delete(Long id) {
        Reservation reservation = this.reservationRespository.findById(id).orElseThrow(EntityNotFoundException::new);
        this.reservationRespository.deleteById(id);
        SmsContent smsContent = smsContentRepository.findByType(SmsType.CANCELLATION).orElseThrow(SmsContentNotFoundException::new);
        SmsDTO smsDTO = new SmsDTO(reservation.getCustomer().getPhoneNumber(), smsContent.getContent());
        messagePublisher.enqueue(smsDTO, RabbitMQConfiguration.CONFIRMATION_ROUTING_KEY);
    }

    private SmsDTO createSmsDTO(Reservation reservation) {
        SmsContent smsContent = smsContentRepository.findByType(SmsType.CONFIRMATION).orElseThrow(SmsContentNotFoundException::new);
        String dayOfWeek = reservation.getDate().getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.forLanguageTag(SERBIAN_LANGUAGE_TAG));
        String dayMonth = reservation.getDate().format(DateTimeFormatter.ofPattern(DAY_MONTH_DATE_FORMAT));
        String hoursMinutes = reservation.getDate().format(DateTimeFormatter.ofPattern(HOURS_MINUTES_DATE_FORMAT));
        String employeeName = reservation.getWorker().getFirstName();
        return new SmsDTO(reservation.getCustomer().getPhoneNumber(), MessageFormat.format(smsContent.getContent(), dayOfWeek, dayMonth, hoursMinutes, employeeName));
    }
}
