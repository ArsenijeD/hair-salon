package com.example.hairsalon.controller;

import com.example.hairsalon.dto.FinalizedHairsalonServiceDTO;
import com.example.hairsalon.dto.ReservationDTO;
import com.example.hairsalon.model.FinalizedHairsalonService;
import com.example.hairsalon.model.Reservation;
import com.example.hairsalon.service.FinalizedHairsalonServiceService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("finalized-hairsalon-services")
public class FinalizedHairsalonServiceController {

    private final FinalizedHairsalonServiceService finalizedHairsalonServiceServiceImpl;
    private final ModelMapper modelMapper;

    public FinalizedHairsalonServiceController(FinalizedHairsalonServiceService finalizedHairsalonServiceServiceImpl, ModelMapper modelMapper) {
        this.finalizedHairsalonServiceServiceImpl = finalizedHairsalonServiceServiceImpl;
        this.modelMapper = modelMapper;
    }

    @GetMapping("worker/{workerId}")
    public ResponseEntity<List<FinalizedHairsalonServiceDTO>> getWorkersDailyFinalizedServices(@PathVariable Long workerId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate date) {
        List<FinalizedHairsalonService> finalizedHairsalonServices = finalizedHairsalonServiceServiceImpl.getWorkersDailyFinalizedServices(workerId, date);
        return ResponseEntity.ok().body(modelMapper.map(finalizedHairsalonServices, new TypeToken<List<FinalizedHairsalonServiceDTO>>(){}.getType()));
    }

    @PostMapping
    public ResponseEntity<FinalizedHairsalonServiceDTO> createFinalizedHairsalonService(@RequestBody FinalizedHairsalonServiceDTO finalizedHairsalonServiceDTO) {
        FinalizedHairsalonService finalizedHairsalonService = modelMapper.map(finalizedHairsalonServiceDTO, FinalizedHairsalonService.class);
        FinalizedHairsalonService created = finalizedHairsalonServiceServiceImpl.createFinalizedHairsalonService(finalizedHairsalonService);
        return ResponseEntity.ok().body(modelMapper.map(created, FinalizedHairsalonServiceDTO.class));
    }

}
