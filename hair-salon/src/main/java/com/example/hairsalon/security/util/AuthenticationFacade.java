package com.example.hairsalon.security.util;

import com.example.hairsalon.model.Role;
import org.springframework.security.core.Authentication;

public interface AuthenticationFacade {
    Authentication getAuthentication();
    void authenticateAdmin();
    boolean authenticationHasRole(Role role);
}
