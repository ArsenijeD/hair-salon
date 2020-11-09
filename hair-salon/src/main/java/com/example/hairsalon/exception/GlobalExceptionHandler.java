package com.example.hairsalon.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final String AUTHENTICATION_EXCEPTIONS_MESSAGE = "Invalid username or password";

    @ExceptionHandler({ BadCredentialsException.class, UsernameNotFoundException.class })
    public ResponseEntity<?> handleAuthenticationExceptions(Exception exception) {
        return ResponseEntity.badRequest().body(AUTHENTICATION_EXCEPTIONS_MESSAGE);
    }

}
