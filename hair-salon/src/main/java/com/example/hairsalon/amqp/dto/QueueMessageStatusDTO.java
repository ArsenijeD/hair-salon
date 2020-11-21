package com.example.hairsalon.amqp.dto;

public enum QueueMessageStatusDTO {
    ENQUEUED,
    DEQUEUED,
    SENT,
    UNSENT,
    DELIVERED,
    FAILED
}
