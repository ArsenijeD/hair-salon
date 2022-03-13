package com.example.hairsalon.controller;

import com.example.hairsalon.dto.FinalizedHairsalonServiceDTO;
import com.example.hairsalon.dto.UsedMaterialDTO;
import com.example.hairsalon.model.UsedMaterial;
import com.example.hairsalon.service.UsedMatierialService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("used-materials")
public class UsedMaterialController {

    private final UsedMatierialService usedMatierialServiceImpl;

    private final ModelMapper modelMapper;

    public UsedMaterialController(UsedMatierialService usedMatierialServiceImpl, ModelMapper modelMapper) {
        this.usedMatierialServiceImpl = usedMatierialServiceImpl;
        this.modelMapper = modelMapper;
    }

    @GetMapping("finalized-service/{finalisedServiceId}")
    public ResponseEntity<List<UsedMaterialDTO>> getUsedMaterialsForFinalizedService(@PathVariable Long finalisedServiceId) {
        List<UsedMaterial> usedMaterials = usedMatierialServiceImpl.getAllForFinalizedService(finalisedServiceId);
        return ResponseEntity.ok().body(modelMapper.map(usedMaterials, new TypeToken<List<UsedMaterialDTO>>(){}.getType()));
    }
}
