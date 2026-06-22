package com.rpmcompare.service;

import com.rpmcompare.model.Vehicle;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class VehicleService {

    private static final Vehicle BMW_M3_CS = new Vehicle(
        "BMW", "M3 CS", "BMW M3 CS", "2023",
        "3.0L 6-cyl. biturbo", "S58", "2 993 cm³",
        "Essence", "Auto. 8 rapports", "M xDrive intégrale",
        550, 650, "1 765 kg", "3,4 s", "302 km/h", "GT-550-MS"
    );

    private static final Map<String, List<String>> RANGES = Map.of(
        "BMW",          List.of("Série 1", "Série 3", "Série 4", "Série 5", "X3 M"),
        "Audi",         List.of("A3", "A5", "RS3", "RS6", "TT RS"),
        "Mercedes-AMG", List.of("A 45 S", "C 63", "E 63", "GT", "G 63"),
        "Porsche",      List.of("718", "911", "Taycan", "Panamera", "Cayenne"),
        "Renault",      List.of("Clio", "Mégane RS", "Alpine A110", "Austral", "Arkana")
    );

    public List<String> getBrands() {
        return List.of("BMW", "Audi", "Mercedes-AMG", "Porsche", "Renault");
    }

    public List<String> getRanges(String brand) {
        return RANGES.getOrDefault(brand, List.of());
    }

    public List<String> getModels(String brand, String range) {
        return List.of("M3 Compétition", "M3 CS", "M3 Touring", "320d xDrive");
    }

    public Vehicle getByPlate(String plate) {
        Vehicle v = clone(BMW_M3_CS);
        v.setPlate(plate.toUpperCase());
        return v;
    }

    public Vehicle getByModel(String brand, String range, String model) {
        return clone(BMW_M3_CS);
    }

    public String simulateScan() {
        return "GT-550-MS";
    }

    private Vehicle clone(Vehicle src) {
        return new Vehicle(
            src.getBrand(), src.getModel(), src.getFull(), src.getYear(),
            src.getEngine(), src.getCode(), src.getDisplacement(), src.getFuel(),
            src.getGearbox(), src.getDrive(), src.getPower(), src.getTorque(),
            src.getWeight(), src.getAccel(), src.getVmax(), src.getPlate()
        );
    }
}
