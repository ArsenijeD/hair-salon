package com.example.hairsalon.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "TYPES_OF_SERVICE")
@Table(uniqueConstraints= {
        @UniqueConstraint(columnNames = {"NAME", "TYPE"})
})
public class TypeOfService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name="NAME", length = 50, nullable = false)
    private String name;

    @Column(name = "TYPE", nullable = false)
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(name = "PRICE")
    private double price;

    @OneToMany
    @JoinTable(
            name = "TYPE_OF_SERVICE_RESERVATION",
            joinColumns = {@JoinColumn(name = "TYPE_OF_SERVICE_ID", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "RESERVATION_ID", referencedColumnName = "id")})
    @ToString.Exclude
    private List<Reservation> reservations;
}
