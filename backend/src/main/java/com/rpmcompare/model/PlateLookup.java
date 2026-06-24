package com.rpmcompare.model;

import jakarta.persistence.*;

@Entity
@Table(name = "plate_lookup")
public class PlateLookup {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String plate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "model_id")
    private VehicleModel model;

    public String getPlate() { return plate; }
    public VehicleModel getModel() { return model; }
}
