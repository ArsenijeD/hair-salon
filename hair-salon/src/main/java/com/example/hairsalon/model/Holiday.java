package com.example.hairsalon.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.MonthDay;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "HOLIDAYS")
public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @Column(name="DATE", nullable = false)
    private MonthDay date;

    @Column(name = "NAME", nullable = false)
    @Enumerated(EnumType.STRING)
    private HolidayName name;

    @Column(name = "CELEBRATING_GENDER", nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender celebratingGender;

    @Column(name = "NAME_FOR_SMS", length = 20, nullable = false)
    private String nameForSms;

}
