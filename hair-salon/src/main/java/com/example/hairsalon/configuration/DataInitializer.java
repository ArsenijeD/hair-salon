package com.example.hairsalon.configuration;

import com.example.hairsalon.model.Authority;
import com.example.hairsalon.model.Role;
import com.example.hairsalon.model.User;
import com.example.hairsalon.repository.AuthorityRepository;
import com.example.hairsalon.repository.UserRepository;
import org.springframework.beans.factory.SmartInitializingSingleton;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Configuration
public class DataInitializer implements SmartInitializingSingleton {

    private final UserRepository userRepository;

    private final AuthorityRepository authorityRepository;

    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
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

        authorities.add(admin);
        authorities.add(employee);

        List<Authority> savedAuthorities = this.authorityRepository.saveAll(authorities);

        User akiAdmin = new User(1L, "Arsenije", "Degenek", "aki", passwordEncoder.encode("aki"), new Date(),
                authorities.subList(0, 1), null, null, null);
        User veskoEmployee = new User(2L, "Veselin", "Martinovic", "vesko", passwordEncoder.encode("vesko"), new Date(),
                authorities.subList(1, 2), null, null, null);

        this.userRepository.save(akiAdmin);
        this.userRepository.save(veskoEmployee);
    }
}
