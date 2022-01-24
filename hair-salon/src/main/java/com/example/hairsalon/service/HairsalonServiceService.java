package com.example.hairsalon.service;

import com.example.hairsalon.model.HairsalonService;
import java.util.List;

public interface HairsalonServiceService {
    List<HairsalonService> getAll();
    HairsalonService createHairsalonService(HairsalonService hairsalonService);
    HairsalonService updateHairsalonService(HairsalonService hairsalonService);
    void delete(Long id);
}
