package com.example.hairsalon.exception;

import org.springframework.amqp.AmqpException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final String AUTHENTICATION_EXCEPTIONS_MESSAGE = "Invalid username or password.";

    private static final String INTEGRITY_VIOLATION_EXCEPTION_MESSAGE = "Cannot duplicate entity.";

    private static final String AMQP_EXCEPTION_MESSAGE = "Unable to push message to the queue.";

    private static final String SMS_CONTENT_NOT_FOUND_EXCEPTION_MESSAGE = "Unable to find SMS content.";


    @ExceptionHandler({ BadCredentialsException.class, UsernameNotFoundException.class })
    public ResponseEntity<String> handleAuthenticationExceptions(Exception exception) {
        return ResponseEntity.badRequest().body(AUTHENTICATION_EXCEPTIONS_MESSAGE);
    }

    @ExceptionHandler({ EntityNotFoundException.class })
    public ResponseEntity<String> handleEntityNotFoundException(Exception exception) {
        if (exception instanceof SmsContentNotFoundException)
            return ResponseEntity.status(424).body(SMS_CONTENT_NOT_FOUND_EXCEPTION_MESSAGE);
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler({ DataIntegrityViolationException.class })
    public ResponseEntity<?> handleDataIntegrityViolationException(Exception exception) {
        return ResponseEntity.badRequest().body(INTEGRITY_VIOLATION_EXCEPTION_MESSAGE);
    }

    @ExceptionHandler({ AmqpException.class })
    public ResponseEntity<String> handleAmqpException(Exception exception) {
        //424- Dependency Failed (System unable to send message to the queue)
        return ResponseEntity.status(424).body(AMQP_EXCEPTION_MESSAGE);
    }
}
