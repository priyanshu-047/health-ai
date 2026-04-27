package com.healthai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

/**
 * DTO for health analysis request.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthAnalysisRequest {

    @NotBlank(message = "Symptoms cannot be blank")
    private String symptoms;

    @NotNull(message = "Age is required")
    @Positive(message = "Age must be positive")
    private Integer age;

    @NotBlank(message = "Gender cannot be blank")
    private String gender;

    private String lifestyle;
}