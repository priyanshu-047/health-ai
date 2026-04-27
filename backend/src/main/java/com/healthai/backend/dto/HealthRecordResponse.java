package com.healthai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for health record response (used in history endpoint).
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthRecordResponse {

    private String id;
    private String symptoms;
    private Integer age;
    private String gender;
    private String lifestyle;
    private List<String> possibleConditions;
    private List<String> homeRemedies;
    private List<String> dietPlan;
    private List<String> exercise;
    private List<String> precautions;
    private String disclaimer;
    private LocalDateTime timestamp;
}