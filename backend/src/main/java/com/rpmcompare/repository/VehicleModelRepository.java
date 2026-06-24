package com.rpmcompare.repository;

import com.rpmcompare.model.VehicleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface VehicleModelRepository extends JpaRepository<VehicleModel, Long> {

    List<VehicleModel> findByRangeBrandNameIgnoreCaseAndRangeNameIgnoreCase(
            String brandName, String rangeName);

    Optional<VehicleModel> findByRangeBrandNameIgnoreCaseAndRangeNameIgnoreCaseAndNameIgnoreCase(
            String brandName, String rangeName, String modelName);
}
