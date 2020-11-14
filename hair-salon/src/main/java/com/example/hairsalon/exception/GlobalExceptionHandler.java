package com.example.hairsalon.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final String AUTHENTICATION_EXCEPTIONS_MESSAGE = "Invalid username or password";

    private static final String INTEGRITY_VIOLATION_EXCEPTION_MESSAGE = "Cannot duplicate entity";


    @ExceptionHandler({ BadCredentialsException.class, UsernameNotFoundException.class })
    public ResponseEntity<?> handleAuthenticationExceptions(Exception exception) {
        return ResponseEntity.badRequest().body(AUTHENTICATION_EXCEPTIONS_MESSAGE);
    }

    @ExceptionHandler({ EntityNotFoundException.class })
    public ResponseEntity<?> handleEntityNotFoundException(Exception exception) {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler({ DataIntegrityViolationException.class })
    public ResponseEntity<?> handleDataIntegrityViolationException(Exception exception) {
        return ResponseEntity.badRequest().body(INTEGRITY_VIOLATION_EXCEPTION_MESSAGE);
    }

}
