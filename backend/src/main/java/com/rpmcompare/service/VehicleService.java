package com.rpmcompare.service;

import com.rpmcompare.exception.VehicleNotFoundException;
import com.rpmcompare.model.*;
import com.rpmcompare.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import com.rpmcompare.model.dto.ApiPlaqueResponse;

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

    // --- Configuration de l'API externe ---
    @Value("${api.plaque.base-url:https://api.apiplaqueimmatriculation.com}")
    private String apiBaseUrl;

    @Value("${api.plaque.token:TokenDemo2026B}")
    private String apiToken;

    // Cache mémoire pour accélérer les recherches répétées sur une même plaque
    private final Map<String, Vehicle> apiCache = new ConcurrentHashMap<>();
    private final RestTemplate restTemplate = new RestTemplate();

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
        String normalized = plate.toUpperCase().replaceAll("[\\s\\-]", "");

        // 1. Vérification dans le cache local (réponse instantanée si la plaque a déjà été trouvée via l'API)
        if (apiCache.containsKey(normalized)) {
            return apiCache.get(normalized);
        }

        // 2. Appel à l'API externe
        try {
            String url = apiBaseUrl + "/plaque?immatriculation=" + plate + "&token=" + apiToken + "&pays=FR";
            // L'API nécessite une méthode POST
            ApiPlaqueResponse response = restTemplate.postForObject(url, null, ApiPlaqueResponse.class);
            if (response != null && response.getCode_erreur() == 200 && response.getData() != null) {
                Vehicle v = mapApiDataToVehicle(response.getData());
                apiCache.put(normalized, v); // Ajout au cache UNIQUEMENT après un succès API
                return v;
            }
        } catch (Exception e) {
            // En cas d'erreur (injoignable, hors forfait), on laisse silencieusement couler
            // pour déclencher le fallback
            System.err.println("Erreur API Plaque : " + e.getMessage());
        }

        // 3. Fallback sur la base de données locale si l'API a échoué
        PlateLookup lookup = plateLookupRepository.findAll().stream()
                .filter(p -> p.getPlate().toUpperCase().replaceAll("[\\s\\-]", "").equals(normalized))
                .findFirst()
                .orElseThrow(() -> new VehicleNotFoundException("Plaque inconnue : " + plate));
        
        return toDto(lookup.getModel(), lookup.getPlate());
    }

    private Vehicle mapApiDataToVehicle(com.rpmcompare.model.dto.ApiPlaqueData data) {
        String brand = data.getMarque() != null ? data.getMarque() : "N/A";
        String model = data.getModele() != null ? data.getModele() : "N/A";
        String version = data.getVersion() != null ? data.getVersion() : model;
        String name = brand + " " + version;

        String powerStr = data.getPuisFiscReelCH() != null ? data.getPuisFiscReelCH().replaceAll("[^0-9]", "") : "0";
        int power = powerStr.isEmpty() ? 0 : Integer.parseInt(powerStr);

        String weightStr = data.getPoids() != null ? data.getPoids() : "N/A";
        String displacementStr = data.getCcm() != null ? data.getCcm() : "N/A";

        return new Vehicle(
                brand,
                version,
                name,
                data.getDebutModele() != null ? data.getDebutModele() : "N/A",
                data.getTypeMoteur() != null ? data.getTypeMoteur() : "N/A",
                data.getCodeMoteur() != null ? data.getCodeMoteur() : "N/A",
                displacementStr,
                data.getEnergieNGC() != null ? data.getEnergieNGC() : "N/A",
                data.getBoiteVitesse() != null ? data.getBoiteVitesse() : "N/A",
                data.getTypeTransmission() != null ? data.getTypeTransmission() : "N/A",
                power,
                0, // torque Nm (N/A non possible car type int)
                weightStr,
                "N/A", // accel
                "N/A", // vmax
                data.getImmat() != null ? data.getImmat() : "N/A");
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
        if (s == null)
            throw new VehicleNotFoundException("Specs manquantes pour ce modèle");
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
                plate != null ? plate : "");
    }

    private String frNum(int n) {
        if (n >= 1000)
            return (n / 1000) + " " + String.format("%03d", n % 1000);
        return String.valueOf(n);
    }

    private String frAccel(BigDecimal v) {
        return v.toPlainString().replace(".", ",");
    }
}
