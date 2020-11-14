package com.example.hairsalon.repository;

import com.example.hairsalon.model.TypeOfService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TOSRepository extends JpaRepository<TypeOfService, Long> {
}
