package com.rpmcompare.repository;

import com.rpmcompare.model.VehicleRange;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VehicleRangeRepository extends JpaRepository<VehicleRange, Long> {
    List<VehicleRange> findByBrandNameIgnoreCase(String brandName);
}
