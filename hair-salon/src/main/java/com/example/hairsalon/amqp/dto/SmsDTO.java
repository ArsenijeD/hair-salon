package com.example.hairsalon.amqp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SmsDTO {

    private String phoneNumber;

    private String content;

    //TODO: Consider adding UUID to the SmsDTO

}
