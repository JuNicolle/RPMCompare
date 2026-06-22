package com.rpmcompare.controller;

import com.rpmcompare.model.Vehicle;
import com.rpmcompare.service.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/vehicle/scan")
    public ResponseEntity<Map<String, String>> simulateScan() {
        return ResponseEntity.ok(Map.of("plate", vehicleService.simulateScan()));
    }
}
