package com.example.hairsalon.security.util;


import com.example.hairsalon.model.Role;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacadeImpl implements AuthenticationFacade {

    private static final String ADMIN_USERNAME = "admin";

    private static final String ADMIN_PASSWORD = "admin";

    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Override
    public void authenticateAdmin() {
        Authentication adminAuthentication = new UsernamePasswordAuthenticationToken(ADMIN_USERNAME, ADMIN_PASSWORD);
        SecurityContextHolder.getContext().setAuthentication(adminAuthentication);
    }

    @Override
    public boolean authenticationHasRole(Role role) {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().anyMatch(authority ->
                authority.getAuthority().equals(role.name())
        );
    }
}
