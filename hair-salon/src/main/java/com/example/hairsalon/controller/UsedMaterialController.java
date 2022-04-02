package com.example.hairsalon.controller;

import com.example.hairsalon.dto.FinalizedHairsalonServiceDTO;
import com.example.hairsalon.dto.UsedMaterialDTO;
import com.example.hairsalon.model.FinalizedHairsalonService;
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

    @PostMapping
    public ResponseEntity<UsedMaterialDTO> createUsedMaterial(@RequestBody UsedMaterialDTO usedMaterialDTO) {
        UsedMaterial usedMaterial = modelMapper.map(usedMaterialDTO, UsedMaterial.class);
        UsedMaterial created = usedMatierialServiceImpl.createUsedMaterial(usedMaterial);
        return ResponseEntity.ok().body(modelMapper.map(created, UsedMaterialDTO.class));
    }

    @PutMapping("{id}")
    public ResponseEntity<UsedMaterialDTO> updateUsedMaterial(@PathVariable Long id, @RequestBody UsedMaterialDTO usedMaterialDTO) {
        UsedMaterial usedMaterial = modelMapper.map(usedMaterialDTO, UsedMaterial.class);
        usedMaterial.setId(id);
        UsedMaterial updated = usedMatierialServiceImpl.updateUsedMaterial(usedMaterial);
        return ResponseEntity.ok().body(modelMapper.map(updated, UsedMaterialDTO.class));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteUsedMaterial(@PathVariable Long id) {
        usedMatierialServiceImpl.delete(id);
        return ResponseEntity.noContent().build();
    }
}
