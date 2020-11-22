package com.example.hairsalon.configuration;

import com.example.hairsalon.model.*;
import com.example.hairsalon.repository.AuthorityRepository;
import com.example.hairsalon.repository.HolidayRepository;
import com.example.hairsalon.repository.TOSRepository;
import com.example.hairsalon.repository.UserRepository;
import org.springframework.beans.factory.SmartInitializingSingleton;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.time.Month;
import java.time.MonthDay;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataInitializer implements SmartInitializingSingleton {

    private final UserRepository userRepository;

    private final AuthorityRepository authorityRepository;

    private final TOSRepository tosRepository;

    private final HolidayRepository holidayRepository;

    private final PasswordEncoder passwordEncoder;


    public DataInitializer(UserRepository userRepository, AuthorityRepository authorityRepository, TOSRepository tosRepository, HolidayRepository holidayRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.tosRepository = tosRepository;
        this.holidayRepository = holidayRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void afterSingletonsInstantiated() {

        List<Authority> authorities = new ArrayList<>();

        Authority admin = new Authority();
        admin.setId(1L);
        admin.setName(Role.ADMIN);

        Authority employee = new Authority();
        employee.setId(2L);
        employee.setName(Role.EMPLOYEE);

        Authority customer = new Authority();
        customer.setId(3L);
        customer.setName(Role.CUSTOMER);

        TypeOfService skinning = new TypeOfService();
        skinning.setId(1L);
        skinning.setName("Skinning");
        skinning.setPrice(350.0);
        skinning.setType(Type.MEDIUM);

        Holiday newYear = new Holiday(1L, MonthDay.of(Month.NOVEMBER, 22), HolidayName.NEW_YEAR, Gender.BOTH);
        Holiday christmas = new Holiday(2L, MonthDay.of(Month.JANUARY, 7), HolidayName.CHRISTMAS, Gender.BOTH);
        Holiday internationalWomensDay = new Holiday(3L, MonthDay.of(Month.MARCH, 8), HolidayName.INTERNATIONAL_WOMENS_DAY, Gender.FEMALE);
        Holiday easter = new Holiday(4L, MonthDay.of(Month.APRIL, 15), HolidayName.EASTER, Gender.BOTH);

        authorities.add(admin);
        authorities.add(employee);
        authorities.add(customer);

        List<Authority> savedAuthorities = this.authorityRepository.saveAll(authorities);

        User rootAdmin = new User(1L, "Admin", "Adminovic", "admin", passwordEncoder.encode("admin"), LocalDateTime.now(),
                "00381691995215", Gender.MALE, authorities.subList(0, 1), null, null, null);
//        User akiAdmin = new User(2L, "Arsenije", "Degenek", "aki", passwordEncoder.encode("aki"), LocalDateTime.now(),
//                "00381691995215", Gender.MALE, authorities.subList(0, 1), null, null, null);
        User veskoEmployee = new User(2L, "Veselin", "Martinovic", "vesko", passwordEncoder.encode("vesko"), LocalDateTime.now(),
                "00381691995215", Gender.MALE, authorities.subList(1, 2), null, null, null);
        User dejanCustomer = new User(3L, "Dejan", "Dejanovic", "dejan", passwordEncoder.encode("dejan"), LocalDateTime.now(),
                "00381691995215", Gender.MALE, authorities.subList(2, 3), null, null, null);

//        this.userRepository.save(akiAdmin);
        this.userRepository.save(rootAdmin);
        this.userRepository.save(veskoEmployee);
        this.userRepository.save(dejanCustomer);


        this.tosRepository.save(skinning);

        this.holidayRepository.save(newYear);
        this.holidayRepository.save(christmas);
        this.holidayRepository.save(internationalWomensDay);
        this.holidayRepository.save(easter);

    }
}
