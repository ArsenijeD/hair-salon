package com.example.hairsalon.controller;

import com.example.hairsalon.dto.ReservationDTO;
import com.example.hairsalon.dto.UserHairsalonServiceDTO;
import com.example.hairsalon.model.UserHairsalonService;
import com.example.hairsalon.service.UserHairsalonServiceService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("hairsalon-services")
public class UserHairsalonServiceController {

    private final UserHairsalonServiceService userHairsalonServiceServiceImpl;

    private final ModelMapper modelMapper;

    public UserHairsalonServiceController(UserHairsalonServiceService userHiarsalonServiceService, ModelMapper modelMapper) {
        this.userHairsalonServiceServiceImpl = userHiarsalonServiceService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("worker/{workerId}")
    public ResponseEntity<List<ReservationDTO>> getWorkersProfitPerService(@PathVariable Long workerId) {
        List<UserHairsalonService> userHairsalonServices = userHairsalonServiceServiceImpl.getWorkersProfitPerService(workerId);
        return ResponseEntity.ok().body(modelMapper.map(userHairsalonServices, new TypeToken<List<UserHairsalonServiceDTO>>(){}.getType()));
    }

    @PostMapping
    public ResponseEntity<UserHairsalonServiceDTO> createWorkersHairsalonService(@RequestBody UserHairsalonServiceDTO userHairsalonServiceDTO) {
        UserHairsalonService userHairsalonService = modelMapper.map(userHairsalonServiceDTO, UserHairsalonService.class);
        UserHairsalonService created = this.userHairsalonServiceServiceImpl.createWorkersHairsalonService(userHairsalonService);
        return ResponseEntity.ok().body(modelMapper.map(created, UserHairsalonServiceDTO.class));
    }

    @PatchMapping("worker/{workerId}/service/{serviceId}")
    public ResponseEntity<UserHairsalonServiceDTO> updateWorkersPercentagePerService(@PathVariable Long workerId, @PathVariable Long serviceId, @RequestBody UserHairsalonServiceDTO userHairsalonServiceDTO) {
        UserHairsalonService updated = userHairsalonServiceServiceImpl.updateWorkersPercentagePerService(workerId, serviceId, userHairsalonServiceDTO.getPercentage());
        return ResponseEntity.ok().body(modelMapper.map(updated, UserHairsalonServiceDTO.class));
    }

    @DeleteMapping("worker/{workerId}/service/{serviceId}")
    public ResponseEntity<Void> deleteWorkersHairsalonService(@PathVariable Long workerId, @PathVariable Long serviceId) {
        this.userHairsalonServiceServiceImpl.deleteWorkersHairsalonService(workerId, serviceId);
        return ResponseEntity.noContent().build();
    }

}
