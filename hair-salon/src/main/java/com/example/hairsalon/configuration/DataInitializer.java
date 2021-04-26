package com.example.hairsalon.configuration;

import com.example.hairsalon.model.*;
import com.example.hairsalon.repository.*;
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

    private final SmsContentRepository smsContentRepository;

    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, AuthorityRepository authorityRepository, TOSRepository tosRepository, HolidayRepository holidayRepository, SmsContentRepository smsContentRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.tosRepository = tosRepository;
        this.holidayRepository = holidayRepository;
        this.smsContentRepository = smsContentRepository;
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

        Authority apprentice = new Authority();
        apprentice.setId(3L);
        apprentice.setName(Role.APPRENTICE);

        Authority customer = new Authority();
        customer.setId(4L);
        customer.setName(Role.CUSTOMER);

        TypeOfService skinning = new TypeOfService();
        skinning.setId(1L);
        skinning.setName("Skinning");
        skinning.setPrice(350.0);
        skinning.setLength(Length.MEDIUM);

        Holiday newYear = new Holiday(1L, MonthDay.of(Month.NOVEMBER, 28), HolidayName.NEW_YEAR, Gender.BOTH, "Novu godinu");
        Holiday christmas = new Holiday(2L, MonthDay.of(Month.JANUARY, 7), HolidayName.CHRISTMAS, Gender.BOTH, "Božić");
        Holiday internationalWomensDay = new Holiday(3L, MonthDay.of(Month.NOVEMBER, 28), HolidayName.INTERNATIONAL_WOMENS_DAY, Gender.FEMALE, "Osmi mart");
        Holiday easter = new Holiday(4L, MonthDay.of(Month.APRIL, 15), HolidayName.EASTER, Gender.BOTH, "Uskrs");

        authorities.add(admin);
        authorities.add(employee);
        authorities.add(apprentice);
        authorities.add(customer);

        List<Authority> savedAuthorities = this.authorityRepository.saveAll(authorities);

        User rootAdmin = new User(1L, "Admin", "Adminovic", "admin", passwordEncoder.encode("admin"), LocalDateTime.now(),
                "00381691995215", Gender.MALE, authorities.subList(0, 1));
//        User akiAdmin = new User(2L, "Arsenije", "Degenek", "aki", passwordEncoder.encode("aki"), LocalDateTime.now(),
//                "00381691995215", Gender.MALE, authorities.subList(0, 1), null, null, null);
        User veskoEmployee = new User(2L, "Veselin", "Martinovic", "vesko", passwordEncoder.encode("vesko"), LocalDateTime.now(),
                "00381691995215", Gender.MALE, authorities.subList(1, 2));
        User dejanCustomer = new User(3L, "Dejan", "Dejanovic", "dejan", passwordEncoder.encode("dejan"), LocalDateTime.now(),
                "00381691995215", Gender.MALE, authorities.subList(3, 4));
        User marinaCustomer = new User(4L, "Marina", "Marina", "marina", passwordEncoder.encode("marina"), LocalDateTime.now(),
                "00381691995215", Gender.FEMALE, authorities.subList(3, 4));

        SmsContent createdReservationContent = new SmsContent(1L, "Poštovani, upravo ste zakazali Vaš termin za {0}, {1} u {2}. Vaš frizer je {3}.", SmsType.CONFIRMATION);
        SmsContent reminderReservationContent = new SmsContent(2L, "Poštovani, podsećamo Vas da je Vaš termin danas u {0}. Hvala.", SmsType.REMINDER);
        SmsContent gratitudeReservationContent = new SmsContent(3L, "Hvala što ste koristili naše usluge. Čekamo Vas ponovo. Vaš frizer.", SmsType.GRATITUDE);
        SmsContent canceledReservationContent = new SmsContent(4L, "Vaša rezervacija je otkazana. Vaš frizer.", SmsType.CANCELLATION);
        SmsContent holidayContent = new SmsContent(5L, "Poštovani, čestitamo Vam {0}.", SmsType.HOLIDAYS);

        this.userRepository.save(rootAdmin);
        this.userRepository.save(veskoEmployee);
        this.userRepository.save(dejanCustomer);
        this.userRepository.save(marinaCustomer);

        this.tosRepository.save(skinning);

        this.holidayRepository.save(newYear);
        this.holidayRepository.save(christmas);
        this.holidayRepository.save(internationalWomensDay);
        this.holidayRepository.save(easter);

        this.smsContentRepository.save(createdReservationContent);
        this.smsContentRepository.save(reminderReservationContent);
        this.smsContentRepository.save(gratitudeReservationContent);
        this.smsContentRepository.save(canceledReservationContent);
        this.smsContentRepository.save(holidayContent);
    }
}
