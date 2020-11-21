package com.example.hairsalon.amqp.configuration;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfiguration {

    //TODO Move all the project constants to application.yml

    public static final String EXCHANGE_NAME = "reservations_direct_exchange";

    public static final String CONFIRMATION_MESSAGES_QUEUE = "confirmation_queue";

    public static final String REMINDER_MESSAGES_QUEUE = "reminder_queue";

    public static final String CANCELLATION_MESSAGES_QUEUE = "cancellation_queue";

    public static final String HOLIDAYS_QUEUE = "holidays_queue";

    public static final String GRATITUDE_QUEUE = "gratitude_queue";

    public static final String CONFIRMATION_ROUTING_KEY = "confirmation";

    public static final String REMINDER_ROUTING_KEY = "reminder";

    public static final String CANCELLATION_ROUTING_KEY = "cancellation";

    public static final String HOLIDAYS_ROUTING_KEY = "holidays";

    public static final String GRATITUDE_ROUTING_KEY = "gratitude";

    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue confirmationQueue() {
        return new Queue(CONFIRMATION_MESSAGES_QUEUE);
    }

    @Bean
    public Queue reminderQueue() {
        return new Queue(REMINDER_MESSAGES_QUEUE);
    }

    @Bean
    public Queue cancellationQueue() {
        return new Queue(CANCELLATION_MESSAGES_QUEUE);
    }

    @Bean
    public Queue holidaysQueue() {
        return new Queue(HOLIDAYS_QUEUE);
    }

    @Bean
    public Queue gratitudeQueue() {
        return new Queue(GRATITUDE_QUEUE);
    }

    @Bean
    public Binding confirmationBinding(Queue confirmationQueue, DirectExchange directExchange) {
        return BindingBuilder.bind(confirmationQueue).to(directExchange).with(CONFIRMATION_ROUTING_KEY);
    }

    @Bean
    public Binding reminderBinding(Queue reminderQueue, DirectExchange directExchange) {
        return BindingBuilder.bind(reminderQueue).to(directExchange).with(REMINDER_ROUTING_KEY);
    }

    @Bean
    public Binding cancellationBinding(Queue cancellationQueue, DirectExchange directExchange) {
        return BindingBuilder.bind(cancellationQueue).to(directExchange).with(CANCELLATION_ROUTING_KEY);
    }
    @Bean
    public Binding holidaysBinding(Queue holidaysQueue, DirectExchange directExchange) {
        return BindingBuilder.bind(holidaysQueue).to(directExchange).with(HOLIDAYS_ROUTING_KEY);
    }

    @Bean
    public Binding gratitudeBindingBinding(Queue gratitudeQueue, DirectExchange directExchange) {
        return BindingBuilder.bind(gratitudeQueue).to(directExchange).with(GRATITUDE_ROUTING_KEY);
    }

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean public AmqpTemplate template(ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;
    }
}
