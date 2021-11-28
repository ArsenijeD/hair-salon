package com.example.hairsalon.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "HAIRSALON_SERVICE")
@Table(uniqueConstraints= {
        @UniqueConstraint(columnNames = {"NAME", "TYPE"})
})
public class HairsalonService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name="NAME", nullable = false)
    @Enumerated(EnumType.STRING)
    private TypeOfService name;

    @Column(name = "TYPE", nullable = false)
    @Enumerated(EnumType.STRING)
    private Length length;

    @Column(name = "PRICE")
    private double price;

    @OneToMany(mappedBy= "hairsalonService")
    private List<UserHairsalonService> userServices;

}
