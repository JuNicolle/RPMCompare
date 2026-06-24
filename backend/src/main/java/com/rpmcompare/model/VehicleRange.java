package com.rpmcompare.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "vehicle_range")
public class VehicleRange {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    private String name;

    @OneToMany(mappedBy = "range", fetch = FetchType.LAZY)
    private List<VehicleModel> models;

    public Long getId() { return id; }
    public Brand getBrand() { return brand; }
    public String getName() { return name; }
    public List<VehicleModel> getModels() { return models; }
}
