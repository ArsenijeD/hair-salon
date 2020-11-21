package com.example.hairsalon.amqp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NTHMessageRequestDTO {

    private String sender;

    private String phoneNumber;

    private String text;

    //TODO Add non mandatory fields if needed (see in NDH user manual)

}
