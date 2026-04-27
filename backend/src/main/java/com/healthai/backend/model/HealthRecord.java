package com.healthai.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Entity representing a health analysis record stored in MongoDB.
 * Maps to the 'health_records' collection.
 */
@Document(collection = "health_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthRecord {

    @Id
    private String id;

    @Field("symptoms")
    private String symptoms;

    @Field("age")
    private Integer age;

    @Field("gender")
    private String gender;

    @Field("lifestyle")
    private String lifestyle;

    @Field("possible_conditions")
    private List<String> possibleConditions;

    @Field("home_remedies")
    private List<String> homeRemedies;

    @Field("diet_plan")
    private List<String> dietPlan;

    @Field("exercise")
    private List<String> exercise;

    @Field("precautions")
    private List<String> precautions;

    @Field("disclaimer")
    private String disclaimer;

    @CreatedDate
    @Field("timestamp")
    private LocalDateTime timestamp;
}