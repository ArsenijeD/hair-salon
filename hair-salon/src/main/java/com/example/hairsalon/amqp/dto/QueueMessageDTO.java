package com.example.hairsalon.amqp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueueMessageDTO {

    private SmsDTO sms;
    private QueueMessageStatusDTO status;
    private String description;
}
