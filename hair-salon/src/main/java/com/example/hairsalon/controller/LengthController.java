package com.example.hairsalon.controller;

import com.example.hairsalon.service.LengthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("lengths")
public class LengthController {

    private final LengthService lengthServiceImpl;

    public LengthController(LengthService lengthServiceImpl) {
        this.lengthServiceImpl = lengthServiceImpl;
    }

    @GetMapping
    public ResponseEntity<List<String>> getLengths() {
        List<String> lengths = lengthServiceImpl.getAll();
        return ResponseEntity.ok().body(lengths);
    }
}
