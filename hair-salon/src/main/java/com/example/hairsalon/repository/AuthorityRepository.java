package com.example.hairsalon.repository;

import com.example.hairsalon.model.Authority;
import com.example.hairsalon.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Optional<Authority> findByName(Role name);
}
