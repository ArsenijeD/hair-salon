package com.example.hairsalon.repository;

import com.example.hairsalon.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository  extends JpaRepository<Material, Long> {
}
