package com.example.hairsalon.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "FINALIZED_USER_HAIRSALON_SERVICE")
public class FinalizedHairsalonService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name="DATE", nullable = false)
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "CUSTOMER_ID", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "USER_HAIRSALON_SERVICE_ID", nullable = false)
    private UserHairsalonService userHairsalonService;
}
