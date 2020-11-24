package com.example.hairsalon.repository;

import com.example.hairsalon.model.SmsContent;
import com.example.hairsalon.model.SmsType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SmsContentRepository extends JpaRepository<SmsContent, Long> {
    Optional<SmsContent> findByType(SmsType smsType);
}
