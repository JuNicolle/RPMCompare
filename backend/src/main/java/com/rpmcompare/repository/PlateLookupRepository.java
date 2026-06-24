package com.rpmcompare.repository;

import com.rpmcompare.model.PlateLookup;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PlateLookupRepository extends JpaRepository<PlateLookup, Long> {
    Optional<PlateLookup> findByPlateIgnoreCase(String plate);
}
