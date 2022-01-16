package com.example.hairsalon.controller;


import com.example.hairsalon.dto.HairsalonServiceDTO;
import com.example.hairsalon.dto.ReservationDTO;
import com.example.hairsalon.model.HairsalonService;
import com.example.hairsalon.service.HairsalonServiceService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("services")
public class HairsalonServiceController {

    private final HairsalonServiceService hairsalonServiceServiceImpl;

    private final ModelMapper modelMapper;

    public HairsalonServiceController(HairsalonServiceService hairsalonServiceServiceImpl, ModelMapper modelMapper) {
        this.hairsalonServiceServiceImpl = hairsalonServiceServiceImpl;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<HairsalonServiceDTO>> getHairsalonServices() {
        List<HairsalonService> hairsalonServices = hairsalonServiceServiceImpl.getAll();
        return ResponseEntity.ok().body(modelMapper.map(hairsalonServices, new TypeToken<List<HairsalonServiceDTO>>(){}.getType()));
    }
}
