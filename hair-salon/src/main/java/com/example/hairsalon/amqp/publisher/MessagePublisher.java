package com.example.hairsalon.amqp.publisher;

import com.example.hairsalon.amqp.configuration.RabbitMQConfiguration;
import com.example.hairsalon.amqp.dto.QueueMessageDTO;
import com.example.hairsalon.amqp.dto.QueueMessageStatusDTO;
import com.example.hairsalon.amqp.dto.SmsDTO;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class MessagePublisher {

    private final RabbitTemplate rabbitTemplate;

    public MessagePublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
    public QueueMessageDTO enqueue(SmsDTO smsDTO, String routingKey) throws AmqpException {
        QueueMessageDTO message = new QueueMessageDTO(smsDTO, QueueMessageStatusDTO.ENQUEUED);
        rabbitTemplate.convertAndSend(RabbitMQConfiguration.EXCHANGE_NAME, routingKey, message);
        return message;
    }
}
