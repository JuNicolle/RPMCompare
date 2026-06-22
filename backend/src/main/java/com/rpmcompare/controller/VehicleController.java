package com.rpmcompare.controller;

import com.rpmcompare.model.Vehicle;
import com.rpmcompare.service.VehicleService;
import com.rpmcompare.service.PlateRecognizerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping("/brands")
    public List<String> getBrands() {
        return vehicleService.getBrands();
    }

    @GetMapping("/brands/{brand}/ranges")
    public List<String> getRanges(@PathVariable String brand) {
        return vehicleService.getRanges(brand);
    }

    @GetMapping("/brands/{brand}/ranges/{range}/models")
    public List<String> getModels(@PathVariable String brand, @PathVariable String range) {
        return vehicleService.getModels(brand, range);
    }

    @GetMapping("/vehicle/by-plate/{plate}")
    public ResponseEntity<Vehicle> getByPlate(@PathVariable String plate) {
        return ResponseEntity.ok(vehicleService.getByPlate(plate));
    }

    @GetMapping("/vehicle/by-model")
    public ResponseEntity<Vehicle> getByModel(
            @RequestParam String brand,
            @RequestParam String range,
            @RequestParam String model) {
        return ResponseEntity.ok(vehicleService.getByModel(brand, range, model));
    }

    @PostMapping(value = "/vehicle/scan", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> scanImage(@RequestParam("image") MultipartFile image) {
        try {
            String plate = vehicleService.ocrPlate(image);
            return ResponseEntity.ok(Map.of("plate", plate));
        } catch (PlateRecognizerService.PlateNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(Map.of("error", "Erreur OCR : " + e.getMessage()));
        }
    }
}
