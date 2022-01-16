package com.example.hairsalon.service.impl;

import com.example.hairsalon.model.HairsalonService;
import com.example.hairsalon.repository.HairsalonServiceRepository;
import com.example.hairsalon.service.HairsalonServiceService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class HairsalonServiceServiceImpl implements HairsalonServiceService {

    private final HairsalonServiceRepository hairsalonServiceRepository;

    public HairsalonServiceServiceImpl(HairsalonServiceRepository hairsalonServiceRepository) {
        this.hairsalonServiceRepository = hairsalonServiceRepository;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    @Transactional
    public List<HairsalonService> getAll() {
        List<HairsalonService> hairsalonServices = hairsalonServiceRepository.findAll();
        if (hairsalonServices.isEmpty()) {
            throw new EntityNotFoundException();
        } else {
            return hairsalonServices;
        }
    }
}
