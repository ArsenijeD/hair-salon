package com.example.hairsalon.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "SMS_CONTENTS")
public class SmsContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @Column(name = "CONTENT", length = 100, nullable = false)
    private String content;

    @Column(name = "name", nullable = false)
    @Enumerated(EnumType.STRING)
    private SmsType type;
}
