package com.example.hairsalon.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "USER_SERVICES")
@Table(uniqueConstraints= {
        @UniqueConstraint(columnNames = {"USER_ID", "SERVICE_ID"})
})
public class UserHairsalonService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "SERVICE_ID", nullable = false)
    private HairsalonService hairsalonService;

    @Column(name = "PERCENTAGE", nullable = false)
    private Long percentage;

}
