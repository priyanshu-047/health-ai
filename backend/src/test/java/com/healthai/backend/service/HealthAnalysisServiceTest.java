package com.healthai.backend.service;

import com.healthai.backend.dto.HealthAnalysisRequest;
import com.healthai.backend.dto.HealthAnalysisResponse;
import com.healthai.backend.model.HealthRecord;
import com.healthai.backend.repository.HealthRecordRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class HealthAnalysisServiceTest {

    @Mock
    private OllamaService ollamaService;

    @Mock
    private HealthRecordRepository healthRecordRepository;

    private HealthAnalysisService healthAnalysisService;

    @BeforeEach
    void setUp() {
        healthAnalysisService = new HealthAnalysisService(ollamaService, healthRecordRepository);
    }

    @Test
    void analyzeHealth_ValidRequest_ReturnsResponseAndSavesRecord() {
        // Given
        HealthAnalysisRequest request = HealthAnalysisRequest.builder()
                .symptoms("fever, headache")
                .age(25)
                .gender("male")
                .lifestyle("sedentary")
                .build();

        HealthAnalysisResponse aiResponse = HealthAnalysisResponse.builder()
                .possibleConditions(Arrays.asList("Common cold", "Flu"))
                .homeRemedies(Arrays.asList("Rest", "Hydration"))
                .dietPlan(Arrays.asList("Soup", "Fruits"))
                .exercise(Arrays.asList("Light walking"))
                .precautions(Arrays.asList("Avoid cold"))
                .disclaimer("This is not medical advice")
                .build();

        HealthRecord savedRecord = HealthRecord.builder()
                .id("record123")
                .symptoms(request.getSymptoms())
                .age(request.getAge())
                .gender(request.getGender())
                .lifestyle(request.getLifestyle())
                .possibleConditions(aiResponse.getPossibleConditions())
                .homeRemedies(aiResponse.getHomeRemedies())
                .dietPlan(aiResponse.getDietPlan())
                .exercise(aiResponse.getExercise())
                .precautions(aiResponse.getPrecautions())
                .disclaimer(aiResponse.getDisclaimer())
                .timestamp(LocalDateTime.now())
                .build();

        when(ollamaService.generateHealthAnalysis(
                request.getSymptoms(),
                request.getAge(),
                request.getGender(),
                request.getLifestyle()
        )).thenReturn(Mono.just(aiResponse));

        when(healthRecordRepository.save(any(HealthRecord.class)))
                .thenReturn(Mono.just(savedRecord));

        // When & Then
        StepVerifier.create(healthAnalysisService.analyzeHealth(request))
                .expectNextMatches(response ->
                        response.getPossibleConditions().equals(aiResponse.getPossibleConditions()) &&
                        response.getHomeRemedies().equals(aiResponse.getHomeRemedies()) &&
                        response.getDietPlan().equals(aiResponse.getDietPlan())
                )
                .verifyComplete();
    }

    @Test
    void getAllHealthRecords_ReturnsFluxOfRecords() {
        // Given
        HealthRecord record1 = HealthRecord.builder()
                .id("1")
                .symptoms("cough")
                .age(30)
                .gender("female")
                .timestamp(LocalDateTime.now().minusDays(1))
                .build();
        HealthRecord record2 = HealthRecord.builder()
                .id("2")
                .symptoms("fever")
                .age(40)
                .gender("male")
                .timestamp(LocalDateTime.now())
                .build();

        when(healthRecordRepository.findAllByOrderByTimestampDesc())
                .thenReturn(Flux.just(record2, record1));

        // When & Then
        StepVerifier.create(healthAnalysisService.getAllHealthRecords())
                .expectNextCount(2)
                .verifyComplete();
    }

    @Test
    void analyzeHealth_OllamaServiceError_PropagatesError() {
        // Given
        HealthAnalysisRequest request = HealthAnalysisRequest.builder()
                .symptoms("fever")
                .age(25)
                .gender("male")
                .build();

        when(ollamaService.generateHealthAnalysis(
                request.getSymptoms(),
                request.getAge(),
                request.getGender(),
                request.getLifestyle()
        )).thenReturn(Mono.error(new RuntimeException("AI service down")));

        // When & Then
        StepVerifier.create(healthAnalysisService.analyzeHealth(request))
                .expectError(RuntimeException.class)
                .verify();
    }
}