package com.rpmcompare.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "brand")
public class Brand {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String country;

    @OneToMany(mappedBy = "brand", fetch = FetchType.LAZY)
    private List<VehicleRange> ranges;

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCountry() { return country; }
    public List<VehicleRange> getRanges() { return ranges; }
}
