package com.healthai.backend.repository;

import com.healthai.backend.model.HealthRecord;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

/**
 * Reactive repository for HealthRecord entities.
 */
@Repository
public interface HealthRecordRepository extends ReactiveMongoRepository<HealthRecord, String> {

    /**
     * Find all health records sorted by timestamp descending.
     * @return Flux of HealthRecord
     */
    Flux<HealthRecord> findAllByOrderByTimestampDesc();
}