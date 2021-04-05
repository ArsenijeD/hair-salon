package com.example.hairsalon.service.impl;

import com.example.hairsalon.model.Authority;
import com.example.hairsalon.model.Role;
import com.example.hairsalon.model.User;
import com.example.hairsalon.repository.AuthorityRepository;
import com.example.hairsalon.repository.UserRepository;
import com.example.hairsalon.security.util.AuthenticationFacade;
import com.example.hairsalon.service.UserService;
import com.example.hairsalon.security.util.CredentialsUtil;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Arrays;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final AuthorityRepository authorityRepository;

    private final AuthenticationFacade authenticationFacadeImpl;

    private final PasswordEncoder passwordEncoder;

    private final CredentialsUtil credentialsUtil;

    public UserServiceImpl(UserRepository userRepository, AuthorityRepository authorityRepository, AuthenticationFacade authenticationFacadeImpl, PasswordEncoder passwordEncoder, CredentialsUtil credentialsUtil) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.authenticationFacadeImpl = authenticationFacadeImpl;
        this.passwordEncoder = passwordEncoder;
        this.credentialsUtil = credentialsUtil;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public User getByUserName(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public User createUser(User user) {
        CharSequence password = credentialsUtil.generatePassword(12);
        user.setPassword(passwordEncoder.encode(password));
        if (user.hasRole(Role.CUSTOMER) || (!user.hasRole(Role.CUSTOMER) && user.getUsername() == null)) {
            String username = credentialsUtil.generateUsername(user.getFirstName(), user.getPhoneNumber());
            user.setUsername(username);
        }
        return userRepository.save(user);
    }


}
