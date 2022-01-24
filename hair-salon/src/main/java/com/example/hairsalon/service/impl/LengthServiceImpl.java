package com.example.hairsalon.service.impl;

import com.example.hairsalon.model.Length;
import com.example.hairsalon.service.LengthService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class LengthServiceImpl implements LengthService {
    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    public List<String> getAll() {
        return Stream.of(Length.values()).map(
                Length::name).collect( Collectors.toList());
    }
}
