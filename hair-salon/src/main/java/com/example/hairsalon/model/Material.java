package com.example.hairsalon.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "MATERIALS")
@Table(uniqueConstraints= {
        @UniqueConstraint(columnNames = {"NAME", "BRAND"})
})
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @Column(name="NAME", length = 20, nullable = false)
    private String name;

    @Column(name="BRAND", length = 20, nullable = false)
    private String brand;

    @Column(name="PRICE", nullable = false)
    private double price;

    @Column(name="NUMBER_IN_STOCK", nullable = false)
    private double numberInStock;
}
