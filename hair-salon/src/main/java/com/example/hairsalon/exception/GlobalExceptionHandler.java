package com.example.hairsalon.exception;

import com.example.hairsalon.dto.EmptyJsonResponse;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.amqp.AmqpException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final String BAD_CREDENTIALS_EXCEPTIONS_MESSAGE = "Invalid username or password.";

    private static final String AMQP_EXCEPTION_MESSAGE = "Unable to push message to the queue.";

    private static final String SMS_CONTENT_NOT_FOUND_EXCEPTION_MESSAGE = "Unable to find SMS content.";

    private static final String UNIQUE_CONSTRAINT_EXCEPTION_MESSAGE = "Primary key invalid or duplicated unique attributes.";

    private static final String MISSING_MATERIAL_EXCEPTION_MESSAGE = "There is not enough material for this service.";


    @ExceptionHandler({ BadCredentialsException.class })
    public ResponseEntity<String> handleAuthenticationExceptions(Exception exception) {
        return ResponseEntity.badRequest().body(BAD_CREDENTIALS_EXCEPTIONS_MESSAGE);
    }

    @ExceptionHandler({ EntityNotFoundException.class })
    public ResponseEntity<EmptyJsonResponse> handleEntityNotFoundException(Exception exception) {
        return ResponseEntity.ok().body(new EmptyJsonResponse());
    }

    @ExceptionHandler({ SmsContentNotFoundException.class, EmptyResultDataAccessException.class, UsernameNotFoundException.class })
    public ResponseEntity<String> handleCustomNotFoundException(Exception exception) {
        if (exception instanceof SmsContentNotFoundException)
            return ResponseEntity.status(424).body(SMS_CONTENT_NOT_FOUND_EXCEPTION_MESSAGE);
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler({ AmqpException.class })
    public ResponseEntity<String> handleAmqpException(Exception exception) {
        //424- Dependency Failed (System unable to send message to the queue)
        return ResponseEntity.status(424).body(AMQP_EXCEPTION_MESSAGE);
    }

    @ExceptionHandler({ ConstraintViolationException.class })
    public ResponseEntity<String> handleConstraintViolationException(Exception exception) {
        return ResponseEntity.badRequest().body(UNIQUE_CONSTRAINT_EXCEPTION_MESSAGE);
    }

    @ExceptionHandler({ MissingMaterialException.class })
    public ResponseEntity<String> handleMissingMaterialException(Exception exception) {
        return ResponseEntity.badRequest().body(MISSING_MATERIAL_EXCEPTION_MESSAGE);
    }
}
