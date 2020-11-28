package com.example.hairsalon.repository;

import com.example.hairsalon.model.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.MonthDay;
import java.util.List;
import java.util.Optional;

public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    Optional<List<Holiday>> findByDate(MonthDay date);
}
