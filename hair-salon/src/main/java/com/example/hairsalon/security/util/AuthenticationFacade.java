package com.example.hairsalon.security.util;

import org.springframework.security.core.Authentication;

public interface AuthenticationFacade {
    Authentication getAuthentication();
    void authenticateAdmin();
}
