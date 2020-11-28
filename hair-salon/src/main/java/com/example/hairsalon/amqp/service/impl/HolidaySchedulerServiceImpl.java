package com.example.hairsalon.amqp.service.impl;

import com.example.hairsalon.amqp.configuration.RabbitMQConfiguration;
import com.example.hairsalon.amqp.dto.SmsDTO;
import com.example.hairsalon.amqp.publisher.MessagePublisher;
import com.example.hairsalon.amqp.service.HolidaySchedulerService;
import com.example.hairsalon.exception.SmsContentNotFoundException;
import com.example.hairsalon.model.*;
import com.example.hairsalon.repository.HolidayRepository;
import com.example.hairsalon.repository.SmsContentRepository;
import com.example.hairsalon.repository.UserRepository;
import com.example.hairsalon.security.util.AuthenticationFacade;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.time.MonthDay;
import java.util.List;

@Service
public class HolidaySchedulerServiceImpl implements HolidaySchedulerService {

    private final HolidayRepository holidayRepository;

    private final UserRepository userRepository;

    private final SmsContentRepository smsContentRepository;

    private final MessagePublisher messagePublisher;

    private final AuthenticationFacade authenticationFacadeImpl;

    public HolidaySchedulerServiceImpl(HolidayRepository holidayRepository, UserRepository userRepository, SmsContentRepository smsContentRepository, MessagePublisher messagePublisher, AuthenticationManager authenticationManager, AuthenticationFacade authenticationFacadeImpl) {
        this.holidayRepository = holidayRepository;
        this.userRepository = userRepository;
        this.smsContentRepository = smsContentRepository;
        this.messagePublisher = messagePublisher;
        this.authenticationFacadeImpl = authenticationFacadeImpl;
    }

    @Override
    @Scheduled(cron = "0 0 12 * * *")
    @Transactional
    public void sendHolidayCongratulation() {
        List<Holiday> todayHolidays = holidayRepository.findByDate(MonthDay.now()).orElse(null);
        if (todayHolidays !=  null) {
            authenticationFacadeImpl.authenticateAdmin();
            SmsContent smsContent = smsContentRepository.findByType(SmsType.HOLIDAYS).orElse(null);
            if (smsContent != null) {
                List<User> customers = userRepository.findAllByUserAuthorities_Name(Role.CUSTOMER).orElse(null);
                todayHolidays.forEach(holiday -> {
                    customers.forEach(customer -> {
                        if (holiday.getCelebratingGender() == Gender.BOTH || holiday.getCelebratingGender() == customer.getGender()) {
                            SmsDTO smsDTO = new SmsDTO(customer.getPhoneNumber(), MessageFormat.format(smsContent.getContent(), holiday.getNameForSms()));
                            messagePublisher.enqueue(smsDTO, RabbitMQConfiguration.HOLIDAYS_ROUTING_KEY);
                        }
                    });
                });
            }
        }
    }
    //TODO Consider optimization for not fetching all the customers if not needed
}
