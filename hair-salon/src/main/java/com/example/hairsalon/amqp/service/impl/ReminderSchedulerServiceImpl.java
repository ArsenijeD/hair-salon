package com.example.hairsalon.amqp.service.impl;

import com.example.hairsalon.amqp.configuration.RabbitMQConfiguration;
import com.example.hairsalon.amqp.dto.SmsDTO;
import com.example.hairsalon.amqp.publisher.MessagePublisher;
import com.example.hairsalon.amqp.service.ReminderSchedulerService;
import com.example.hairsalon.exception.SmsContentNotFoundException;
import com.example.hairsalon.model.Holiday;
import com.example.hairsalon.model.Reservation;
import com.example.hairsalon.model.SmsContent;
import com.example.hairsalon.model.SmsType;
import com.example.hairsalon.repository.ReservationRespository;
import com.example.hairsalon.repository.SmsContentRepository;
import com.example.hairsalon.security.util.AuthenticationFacade;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.time.MonthDay;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReminderSchedulerServiceImpl implements ReminderSchedulerService {

    private final ReservationRespository reservationRespository;

    private final SmsContentRepository smsContentRepository;

    private final MessagePublisher messagePublisher;

    private final AuthenticationFacade authenticationFacadeImpl;

    private static final String HOURS_MINUTES_DATE_FORMAT = "HH:mm";

    public ReminderSchedulerServiceImpl(ReservationRespository reservationRespository, SmsContentRepository smsContentRepository, MessagePublisher messagePublisher, AuthenticationFacade authenticationFacadeImpl) {
        this.reservationRespository = reservationRespository;
        this.smsContentRepository = smsContentRepository;
        this.messagePublisher = messagePublisher;
        this.authenticationFacadeImpl = authenticationFacadeImpl;
    }

    @Override
    @Scheduled(cron = "1 * * * * *")
    @Transactional
    public void sendReservationReminder() {
        LocalDateTime reservationDate = LocalDateTime.now().plusMinutes(15).withSecond(0).withNano(0);
        List<Reservation> reservationsForReminding = reservationRespository.findByDate(reservationDate).orElse(null);
        if (reservationsForReminding != null) {
            authenticationFacadeImpl.authenticateAdmin();
            SmsContent smsContent = smsContentRepository.findByType(SmsType.REMINDER).orElseThrow(null);
            if (smsContent != null) {
                reservationsForReminding.forEach(reservationForReminding -> {
                    String hoursMinutes = reservationForReminding.getDate().format(DateTimeFormatter.ofPattern(HOURS_MINUTES_DATE_FORMAT));
                    SmsDTO smsDTO = new SmsDTO(reservationForReminding.getCustomer().getPhoneNumber(), MessageFormat.format(smsContent.getContent(), hoursMinutes));
//                    messagePublisher.enqueue(smsDTO, RabbitMQConfiguration.HOLIDAYS_ROUTING_KEY);
                });
            }
        }
    }
}
