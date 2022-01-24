package com.example.hairsalon.service.impl;

import com.example.hairsalon.model.TypeOfService;
import com.example.hairsalon.service.TypeOfServiceService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TypeOfServiceServiceImpl implements TypeOfServiceService {
    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    public List<String> getAll() {
        return Stream.of(TypeOfService.values()).map(
                TypeOfService::name).collect( Collectors.toList());
    }
}
