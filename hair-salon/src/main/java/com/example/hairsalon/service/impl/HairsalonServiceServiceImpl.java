package com.example.hairsalon.service.impl;

import com.example.hairsalon.amqp.dto.SmsDTO;
import com.example.hairsalon.exception.SmsContentNotFoundException;
import com.example.hairsalon.model.HairsalonService;
import com.example.hairsalon.model.Reservation;
import com.example.hairsalon.model.SmsContent;
import com.example.hairsalon.model.SmsType;
import com.example.hairsalon.repository.HairsalonServiceRepository;
import com.example.hairsalon.service.HairsalonServiceService;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class HairsalonServiceServiceImpl implements HairsalonServiceService {

    private final HairsalonServiceRepository hairsalonServiceRepository;

    private final ModelMapper modelMapper;

    public HairsalonServiceServiceImpl(HairsalonServiceRepository hairsalonServiceRepository, ModelMapper modelMapper) {
        this.hairsalonServiceRepository = hairsalonServiceRepository;
        this.modelMapper = modelMapper;
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

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN)")
    @Transactional
    public HairsalonService createHairsalonService(HairsalonService hairsalonService) {
        return hairsalonServiceRepository.save(hairsalonService);
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN)")
    @Transactional
    public HairsalonService updateHairsalonService(HairsalonService newHairsalonService) {
        HairsalonService oldHairsalonService = hairsalonServiceRepository.findById(newHairsalonService.getId()).orElseThrow(EntityNotFoundException::new);
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.map(newHairsalonService, oldHairsalonService);
        HairsalonService updatedHairsalonService = hairsalonServiceRepository.save(oldHairsalonService);
        return updatedHairsalonService;
    }

    @Override
    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN)")
    @Transactional
    public void delete(Long id) {
        this.hairsalonServiceRepository.deleteById(id);
    }
}
