package com.example.hairsalon.amqp.consumer;

import com.example.hairsalon.amqp.configuration.RabbitMQConfiguration;
import com.example.hairsalon.amqp.dto.NTHMessageRequestDTO;
import com.example.hairsalon.amqp.dto.NTHMessageResponseDTO;
import com.example.hairsalon.amqp.dto.QueueMessageDTO;
import com.example.hairsalon.amqp.dto.QueueMessageStatusDTO;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class MessageConsumer {

    private final WebClient.Builder webClientBuilder;

    private static final String BASE_SMS_GATEWAY_URL = "https://bulk.mobile-gw.com:9090/api/";

    private static final String MESSAGES_ENDPOINT = "message";

    private static final String API_USERNAME = "demoac03";

    private static final String API_PASSWORD = "kkvxqPWD";

    private static final String MESSAGE_SENDER = "SMSInfo";

    public MessageConsumer(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    @RabbitListener(queues = { RabbitMQConfiguration.CONFIRMATION_MESSAGES_QUEUE,
                               RabbitMQConfiguration.REMINDER_MESSAGES_QUEUE,
                               RabbitMQConfiguration.CANCELLATION_MESSAGES_QUEUE,
                               RabbitMQConfiguration.HOLIDAYS_QUEUE,
                               RabbitMQConfiguration.GRATITUDE_QUEUE })
    public void dequeue(QueueMessageDTO queueMessageDTO) {
        queueMessageDTO.setStatus(QueueMessageStatusDTO.DEQUEUED);
        NTHMessageRequestDTO nthMessageRequestDTO = new NTHMessageRequestDTO(MESSAGE_SENDER, queueMessageDTO.getSms().getPhoneNumber(), queueMessageDTO.getSms().getContent());
        NTHMessageResponseDTO nthMessageResponseDTO = webClientBuilder.baseUrl(BASE_SMS_GATEWAY_URL)
                        .defaultHeaders(httpHeader -> httpHeader.setBasicAuth(API_USERNAME, API_PASSWORD))
                        .build()
                        .post()
                        .uri(MESSAGES_ENDPOINT)
                        .body(Mono.just(nthMessageRequestDTO), NTHMessageRequestDTO.class)
                        .retrieve()
                        .bodyToMono(NTHMessageResponseDTO.class)
                        .block();
        if (nthMessageResponseDTO.getStatus() == 0) {
            queueMessageDTO.setStatus(QueueMessageStatusDTO.SENT);
        } else {
            queueMessageDTO.setStatus(QueueMessageStatusDTO.UNSENT);
        }

        //TODO Talk to people from NDH to enable you callback what can provide you information about SMS delivery status
    }
}
