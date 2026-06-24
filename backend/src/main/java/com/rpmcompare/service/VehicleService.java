package com.rpmcompare.service;

import com.rpmcompare.exception.VehicleNotFoundException;
import com.rpmcompare.model.*;
import com.rpmcompare.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class VehicleService {

    private final PlateRecognizerService plateRecognizerService;
    private final BrandRepository brandRepository;
    private final VehicleRangeRepository rangeRepository;
    private final VehicleModelRepository modelRepository;
    private final PlateLookupRepository plateLookupRepository;

    public VehicleService(PlateRecognizerService plateRecognizerService,
                          BrandRepository brandRepository,
                          VehicleRangeRepository rangeRepository,
                          VehicleModelRepository modelRepository,
                          PlateLookupRepository plateLookupRepository) {
        this.plateRecognizerService = plateRecognizerService;
        this.brandRepository = brandRepository;
        this.rangeRepository = rangeRepository;
        this.modelRepository = modelRepository;
        this.plateLookupRepository = plateLookupRepository;
    }

    public List<String> getBrands() {
        return brandRepository.findAll().stream()
                .map(Brand::getName)
                .toList();
    }

    public List<String> getRanges(String brandName) {
        return rangeRepository.findByBrandNameIgnoreCase(brandName).stream()
                .map(VehicleRange::getName)
                .toList();
    }

    public List<String> getModels(String brandName, String rangeName) {
        return modelRepository
                .findByRangeBrandNameIgnoreCaseAndRangeNameIgnoreCase(brandName, rangeName).stream()
                .map(VehicleModel::getName)
                .toList();
    }

    public Vehicle getByPlate(String plate) {
        PlateLookup lookup = plateLookupRepository.findByPlateIgnoreCase(plate)
                .orElseThrow(() -> new VehicleNotFoundException("Plaque inconnue : " + plate));
        return toDto(lookup.getModel(), lookup.getPlate());
    }

    public Vehicle getByModel(String brandName, String rangeName, String modelName) {
        VehicleModel model = modelRepository
                .findByRangeBrandNameIgnoreCaseAndRangeNameIgnoreCaseAndNameIgnoreCase(
                        brandName, rangeName, modelName)
                .orElseThrow(() -> new VehicleNotFoundException(
                        brandName + " / " + rangeName + " / " + modelName + " introuvable"));
        return toDto(model, null);
    }

    public String ocrPlate(MultipartFile image) throws Exception {
        if (!plateRecognizerService.isConfigured()) {
            return "GT-550-MS";
        }
        return plateRecognizerService.recognize(image);
    }

    // ── Mapping entité → DTO ──────────────────────────────────────────────────

    private Vehicle toDto(VehicleModel m, String plate) {
        VehicleSpecs s = m.getSpecs();
        if (s == null) throw new VehicleNotFoundException("Specs manquantes pour ce modèle");
        return new Vehicle(
                m.getRange().getBrand().getName(),
                m.getName(),
                m.getRange().getBrand().getName() + " " + m.getName(),
                m.getYearFrom() != null ? m.getYearFrom().toString() : "—",
                s.getEngineDescription(),
                m.getEngineCode(),
                frNum(s.getDisplacementCc()) + " cm³",
                s.getFuel(),
                s.getGearbox(),
                s.getDrive(),
                s.getPowerHp(),
                s.getTorqueNm(),
                frNum(s.getWeightKg()) + " kg",
                frAccel(s.getAccel0100()) + " s",
                s.getVmaxKph() + " km/h",
                plate != null ? plate : ""
        );
    }

    private String frNum(int n) {
        if (n >= 1000) return (n / 1000) + " " + String.format("%03d", n % 1000);
        return String.valueOf(n);
    }

    private String frAccel(BigDecimal v) {
        return v.toPlainString().replace(".", ",");
    }
}
