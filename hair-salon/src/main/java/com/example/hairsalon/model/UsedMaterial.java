package com.example.hairsalon.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "USED_MATERIAL")
public class UsedMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MATERIAL_ID", nullable = false)
    private Material material;

    @ManyToOne
    @JoinColumn(name = "FINALZIED_HAIRSALON_SERVICE", nullable = false)
    private FinalizedHairsalonService finalizedHairsalonService;

    @Column(name="MATERIAL_SPENT", nullable = false)
    private double materialSpent;
}
