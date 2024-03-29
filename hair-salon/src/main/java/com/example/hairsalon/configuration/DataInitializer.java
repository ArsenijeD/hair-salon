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

    private final HairsalonServiceRepository hairsalonServiceRepository;

    private final UserHairsalonServiceRepository userHairsalonServiceRepository;

    private final HolidayRepository holidayRepository;

    private final SmsContentRepository smsContentRepository;

    private final MaterialRepository materialRepository;

    private final FinalizedHairsalonServiceRepository finalizedHairsalonServiceRepository;

    private final UsedMaterialRepository usedMaterialRepository;

    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, AuthorityRepository authorityRepository,
                           HairsalonServiceRepository hairsalonServiceRepository, HolidayRepository holidayRepository,
                           SmsContentRepository smsContentRepository, PasswordEncoder passwordEncoder,
                           UserHairsalonServiceRepository userHairsalonServiceRepository, MaterialRepository materialRepository,
                           FinalizedHairsalonServiceRepository finalizedHairsalonServiceRepository, UsedMaterialRepository usedMaterialRepository) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.hairsalonServiceRepository = hairsalonServiceRepository;
        this.holidayRepository = holidayRepository;
        this.smsContentRepository = smsContentRepository;
        this.passwordEncoder = passwordEncoder;
        this.userHairsalonServiceRepository = userHairsalonServiceRepository;
        this.materialRepository = materialRepository;
        this.finalizedHairsalonServiceRepository = finalizedHairsalonServiceRepository;
        this.usedMaterialRepository = usedMaterialRepository;
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

        HairsalonService haircut = new HairsalonService();
        haircut.setId(1L);
        haircut.setName(TypeOfService.HAIRCUT);
        haircut.setPrice(350.0);
        haircut.setLength(Length.MEDIUM);

        HairsalonService minival = new HairsalonService();
        minival.setId(2L);
        minival.setName(TypeOfService.MINIVAL);
        minival.setPrice(350.0);
        minival.setLength(Length.MEDIUM);

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
                "00381691995214", Gender.MALE, authorities.subList(0, 1), new ArrayList<UserHairsalonService>());
//        User akiAdmin = new User(2L, "Arsenije", "Degenek", "aki", passwordEncoder.encode("aki"), LocalDateTime.now(),
//                "00381691995215", Gender.MALE, authorities.subList(0, 1), null, null, null);
        User veskoEmployee = new User(2L, "Veselin", "Martinovic", "vesko", passwordEncoder.encode("vesko"), LocalDateTime.now(),
                "00381691995215", Gender.MALE, authorities.subList(1, 2), new ArrayList<UserHairsalonService>());
        User dejanEmployee = new User(3L, "Dejan", "Dejanovic", "dejan", passwordEncoder.encode("dejan"), LocalDateTime.now(),
                "00381691995216", Gender.MALE, authorities.subList(1, 2), new ArrayList<UserHairsalonService>());
        User marinaCustomer = new User(4L, "Marina", "Marina", "marina", passwordEncoder.encode("marina"), LocalDateTime.now(),
                "00381691995217", Gender.FEMALE, authorities.subList(3, 4), new ArrayList<UserHairsalonService>());

        UserHairsalonService veskoHaircutPercentage = new UserHairsalonService(1L, veskoEmployee, haircut, 25L);

        SmsContent createdReservationContent = new SmsContent(1L, "Poštovani, upravo ste zakazali Vaš termin za {0}, {1} u {2}. Vaš frizer je {3}.", SmsType.CONFIRMATION);
        SmsContent reminderReservationContent = new SmsContent(2L, "Poštovani, podsećamo Vas da je Vaš termin danas u {0}. Hvala.", SmsType.REMINDER);
        SmsContent gratitudeReservationContent = new SmsContent(3L, "Hvala što ste koristili naše usluge. Čekamo Vas ponovo. Vaš frizer.", SmsType.GRATITUDE);
        SmsContent canceledReservationContent = new SmsContent(4L, "Vaša rezervacija je otkazana. Vaš frizer.", SmsType.CANCELLATION);
        SmsContent holidayContent = new SmsContent(5L, "Poštovani, čestitamo Vam {0}.", SmsType.HOLIDAYS);

        Material hairGel = new Material(1L, "Gel za kosu", "Taft lux", 350.0, 3);
        Material hairDye = new Material(2L, "Farba za kosu", "Maybelinne", 700.0, 2);

        FinalizedHairsalonService veskoHaircut = new FinalizedHairsalonService(1L, LocalDateTime.now(), marinaCustomer, veskoHaircutPercentage);

        UsedMaterial veskoHaircutGel = new UsedMaterial(1L, hairGel, veskoHaircut, 0.3);
        UsedMaterial veskoHaircutDye = new UsedMaterial(2L, hairDye, veskoHaircut, 0.7);

        this.userRepository.save(rootAdmin);
        this.userRepository.save(veskoEmployee);
        this.userRepository.save(dejanEmployee);
        this.userRepository.save(marinaCustomer);

        this.hairsalonServiceRepository.save(haircut);
        this.hairsalonServiceRepository.save(minival);

        this.userHairsalonServiceRepository.save(veskoHaircutPercentage);

        this.holidayRepository.save(newYear);
        this.holidayRepository.save(christmas);
        this.holidayRepository.save(internationalWomensDay);
        this.holidayRepository.save(easter);

        this.smsContentRepository.save(createdReservationContent);
        this.smsContentRepository.save(reminderReservationContent);
        this.smsContentRepository.save(gratitudeReservationContent);
        this.smsContentRepository.save(canceledReservationContent);
        this.smsContentRepository.save(holidayContent);

        this.materialRepository.save(hairGel);
        this.materialRepository.save(hairDye);

        this.finalizedHairsalonServiceRepository.save(veskoHaircut);

        this.usedMaterialRepository.save(veskoHaircutGel);
        this.usedMaterialRepository.save(veskoHaircutDye);
    }
}
