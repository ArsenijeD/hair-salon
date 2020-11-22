package com.example.hairsalon.amqp.service.impl;

import com.example.hairsalon.amqp.configuration.RabbitMQConfiguration;
import com.example.hairsalon.amqp.dto.SmsDTO;
import com.example.hairsalon.amqp.publisher.MessagePublisher;
import com.example.hairsalon.amqp.service.HolidaySchedulerService;
import com.example.hairsalon.model.Holiday;
import com.example.hairsalon.model.Role;
import com.example.hairsalon.model.User;
import com.example.hairsalon.repository.HolidayRepository;
import com.example.hairsalon.repository.UserRepository;
import com.example.hairsalon.security.util.AuthenticationFacade;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.MonthDay;
import java.util.List;


@Service
public class HolidaySchedulerServiceImpl implements HolidaySchedulerService {

    private final HolidayRepository holidayRepository;

    private final UserRepository userRepository;

    private final MessagePublisher messagePublisher;

    private final AuthenticationFacade authenticationFacadeImpl;

    public HolidaySchedulerServiceImpl(HolidayRepository holidayRepository, UserRepository userRepository, MessagePublisher messagePublisher, AuthenticationManager authenticationManager, AuthenticationFacade authenticationFacadeImpl) {
        this.holidayRepository = holidayRepository;
        this.userRepository = userRepository;
        this.messagePublisher = messagePublisher;
        this.authenticationFacadeImpl = authenticationFacadeImpl;
    }

    @Override
    @Scheduled(cron = "0 0 12 * * *")
    @Transactional
    public void congratulateTodayHolidays() {
        List<Holiday> todayHolidays = holidayRepository.findByDate(MonthDay.now()).orElse(null);
        if (todayHolidays !=  null) {
            authenticationFacadeImpl.authenticateAdmin();
            List<User> customers = userRepository.findAllByUserAuthorities_Name(Role.CUSTOMER).orElse(null);
            todayHolidays.forEach(holiday -> {
                customers.forEach(customer -> {
                    SmsDTO smsDTO = new SmsDTO(customer.getPhoneNumber(), "Cestitamo Vam danasnji praznik.");
                    messagePublisher.enqueue(smsDTO, RabbitMQConfiguration.HOLIDAYS_ROUTING_KEY);
                });
            });
        }
    }
}
