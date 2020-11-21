package com.example.hairsalon.amqp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NTHMessageResponseDTO {

    private int status;

    private String statusText;

    private int messagesCount;

    private String messageId;
}
