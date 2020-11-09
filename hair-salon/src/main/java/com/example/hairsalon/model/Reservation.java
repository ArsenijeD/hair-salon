package com.example.hairsalon.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;


@Data
@Entity(name = "RESERVATIONS")
@Table(uniqueConstraints= {
        @UniqueConstraint(columnNames = {"DATE", "CUSTOMER_ID"}),
        @UniqueConstraint(columnNames = {"DATE", "WORKER_ID"})
})
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @Column(name="DATE", nullable = false)
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "CUSTOMER_ID", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "WORKER_ID", nullable = false)
    private User worker;

    @ManyToOne
    @JoinColumn(name = "APPROVAL_ID", nullable = false)
    private User approval;

    @ManyToOne
    @JoinColumn(name = "TYPE_OF_SERVICE_ID", nullable = false)
    private TypeOfService typeOfService;

}
