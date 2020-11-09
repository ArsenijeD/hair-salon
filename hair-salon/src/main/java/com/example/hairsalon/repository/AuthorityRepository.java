package com.example.hairsalon.repository;

import com.example.hairsalon.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
}
