package com.healthai.backend.controller;

import com.healthai.backend.dto.HealthAnalysisRequest;
import com.healthai.backend.dto.HealthAnalysisResponse;
import com.healthai.backend.dto.HealthRecordResponse;
import com.healthai.backend.service.HealthAnalysisService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebFluxTest(HealthController.class)
class HealthControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @MockBean
    private HealthAnalysisService healthAnalysisService;

    @Test
    void analyzeHealth_ValidRequest_ReturnsOk() {
        HealthAnalysisRequest request = new HealthAnalysisRequest(
                "fever, headache",
                25,
                "male",
                "sedentary"
        );

        HealthAnalysisResponse response = HealthAnalysisResponse.builder()
                .possibleConditions(Arrays.asList("Common cold"))
                .homeRemedies(Arrays.asList("Rest"))
                .dietPlan(Arrays.asList("Soup"))
                .exercise(Arrays.asList("Light walking"))
                .precautions(Arrays.asList("Stay warm"))
                .disclaimer("This is not medical advice")
                .build();

        when(healthAnalysisService.analyzeHealth(any(HealthAnalysisRequest.class)))
                .thenReturn(Mono.just(response));

        webTestClient.post()
                .uri("/health/analyze")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.possibleConditions").isArray()
                .jsonPath("$.homeRemedies[0]").isEqualTo("Rest")
                .jsonPath("$.disclaimer").exists();
    }

    @Test
    void analyzeHealth_InvalidRequest_ReturnsBadRequest() {
        HealthAnalysisRequest invalidRequest = new HealthAnalysisRequest(
                "", // blank symptoms
                -5, // negative age
                "", // blank gender
                null
        );

        webTestClient.post()
                .uri("/health/analyze")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(invalidRequest)
                .exchange()
                .expectStatus().isBadRequest();
    }

    @Test
    void getHealthHistory_ReturnsFlux() {
        HealthRecordResponse record1 = HealthRecordResponse.builder()
                .id("1")
                .symptoms("cough")
                .age(30)
                .gender("female")
                .timestamp(LocalDateTime.now())
                .build();
        HealthRecordResponse record2 = HealthRecordResponse.builder()
                .id("2")
                .symptoms("fever")
                .age(40)
                .gender("male")
                .timestamp(LocalDateTime.now().minusDays(1))
                .build();

        when(healthAnalysisService.getAllHealthRecords())
                .thenReturn(Flux.just(record1, record2));

        webTestClient.get()
                .uri("/health/history")
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(HealthRecordResponse.class)
                .hasSize(2)
                .contains(record1, record2);
    }

    @Test
    void saveHealthAnalysis_ReturnsCreated() {
        HealthAnalysisRequest request = new HealthAnalysisRequest(
                "sore throat",
                28,
                "female",
                "active"
        );

        HealthAnalysisResponse response = HealthAnalysisResponse.builder()
                .possibleConditions(List.of())
                .homeRemedies(List.of())
                .dietPlan(List.of())
                .exercise(List.of())
                .precautions(List.of())
                .disclaimer("test")
                .build();

        when(healthAnalysisService.analyzeHealth(any(HealthAnalysisRequest.class)))
                .thenReturn(Mono.just(response));

        webTestClient.post()
                .uri("/health/save")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .exchange()
                .expectStatus().isCreated()
                .expectBody(String.class)
                .isEqualTo("Health analysis saved successfully");
    }
}