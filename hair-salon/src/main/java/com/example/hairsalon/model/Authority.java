package com.example.hairsalon.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "AUTHORITY")

public class Authority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role name;

    @ManyToMany(mappedBy="authorities")
    @ToString.Exclude
    private List<User> users;

}
