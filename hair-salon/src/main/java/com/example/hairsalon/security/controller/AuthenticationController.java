package com.example.hairsalon.security.controller;

import com.example.hairsalon.security.dto.AuthenticationRequest;
import com.example.hairsalon.security.dto.AuthenticationResponse;
import com.example.hairsalon.security.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsServiceImpl;

    private final JwtUtil jwtUtil;

    public AuthenticationController(AuthenticationManager authenticationManager, UserDetailsService userDetailsServiceImpl, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken((authenticationRequest.getUsername()), authenticationRequest.getPassword()));

        final UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    //TODO Consider implementing logout either by creating in-memory blacklist or by checking client IP and user-agent in the request header
}
