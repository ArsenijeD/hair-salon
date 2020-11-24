package com.example.hairsalon.exception;

import javax.persistence.EntityNotFoundException;

public class SmsContentNotFoundException extends EntityNotFoundException {
    public SmsContentNotFoundException() {
        super();
    }
}
