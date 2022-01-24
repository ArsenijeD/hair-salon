package com.example.hairsalon.controller;

import com.example.hairsalon.dto.HairsalonServiceDTO;
import com.example.hairsalon.model.HairsalonService;
import com.example.hairsalon.service.TypeOfServiceService;
import org.modelmapper.TypeToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("type-of-services")
public class TypeOfServiceController {

    private final TypeOfServiceService typeOfServiceServiceImpl;

    public TypeOfServiceController(TypeOfServiceService typeOfServiceServiceImpl) {
        this.typeOfServiceServiceImpl = typeOfServiceServiceImpl;
    }

    @GetMapping
    public ResponseEntity<List<String>> getTypeOfServices() {
        List<String>  hairsalonServices = typeOfServiceServiceImpl.getAll();
        return ResponseEntity.ok().body(hairsalonServices);
    }
}
