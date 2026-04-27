package com.healthai.backend.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

/**
 * Configuration for WebClient with timeout settings.
 */
@Configuration
public class WebClientConfig {

    private final OllamaConfig ollamaConfig;

    public WebClientConfig(OllamaConfig ollamaConfig) {
        this.ollamaConfig = ollamaConfig;
    }

    @Bean
    public WebClient ollamaWebClient() {
        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, Math.toIntExact(ollamaConfig.getTimeout().getConnect()))
                .responseTimeout(Duration.ofMillis(ollamaConfig.getTimeout().getRead()))
                .doOnConnected(conn ->
                        conn.addHandlerLast(new ReadTimeoutHandler(ollamaConfig.getTimeout().getRead(), TimeUnit.MILLISECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(5000, TimeUnit.MILLISECONDS)));

        return WebClient.builder()
                .baseUrl(ollamaConfig.getBaseUrl())
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
}