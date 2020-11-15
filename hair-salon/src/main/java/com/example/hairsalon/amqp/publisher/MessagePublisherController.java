//package com.example.hairsalon.amqp.publisher;
//
//import com.example.hairsalon.amqp.configuration.RabbitMQConfiguration;
//import com.example.hairsalon.amqp.dto.QueueMessageDTO;
//import com.example.hairsalon.amqp.dto.QueueMessageStatusDTO;
//import com.example.hairsalon.amqp.dto.SmsDTO;
//
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("messages")
//public class MessagePublisherController {
//
//    private final RabbitTemplate rabbitTemplate;
//
//    private static final String ENQUEUE_FEEDBACK = "SMS is pushed to the corresponding queue";
//
//    public MessagePublisherController(RabbitTemplate rabbitTemplate) {
//        this.rabbitTemplate = rabbitTemplate;
//    }
//
//    @PostMapping
//    @PreAuthorize("hasAnyAuthority(T(Role).ADMIN, T(Role).EMPLOYEE)")
//    public ResponseEntity<QueueMessageDTO> enqueue(@RequestBody SmsDTO smsDTO) {
//        QueueMessageDTO message = new QueueMessageDTO(smsDTO, QueueMessageStatusDTO.ENQUEUED, ENQUEUE_FEEDBACK);
//        rabbitTemplate.convertAndSend(RabbitMQConfiguration.EXCHANGE_NAME, RabbitMQConfiguration.ROUTING_KEY, message);
//        return ResponseEntity.ok().body(message);
//    }
//}
