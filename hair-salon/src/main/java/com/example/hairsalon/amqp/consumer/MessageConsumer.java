package com.example.hairsalon.amqp.consumer;

import com.example.hairsalon.amqp.configuration.RabbitMQConfiguration;
import com.example.hairsalon.amqp.dto.QueueMessageDTO;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class MessageConsumer {

    @RabbitListener(queues = { RabbitMQConfiguration.CONFIRMATION_MESSAGES_QUEUE,
                               RabbitMQConfiguration.REMINDER_MESSAGES_QUEUE,
                               RabbitMQConfiguration.CANCELLATION_MESSAGES_QUEUE,
                               RabbitMQConfiguration.HOLIDAYS_QUEUE })
    public void dequeue(QueueMessageDTO queueMessageDTO) {
        QueueMessageDTO received = queueMessageDTO;
    }
}
