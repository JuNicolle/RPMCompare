package com.rpmcompare.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicle_model")
public class VehicleModel {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "range_id")
    private VehicleRange range;

    private String name;

    @Column(name = "year_from") private Short yearFrom;
    @Column(name = "year_to")   private Short yearTo;
    @Column(name = "body_style") private String bodyStyle;
    @Column(name = "engine_code") private String engineCode;

    @OneToOne(mappedBy = "model", fetch = FetchType.EAGER)
    private VehicleSpecs specs;

    public Long getId() { return id; }
    public VehicleRange getRange() { return range; }
    public String getName() { return name; }
    public Short getYearFrom() { return yearFrom; }
    public Short getYearTo() { return yearTo; }
    public String getBodyStyle() { return bodyStyle; }
    public String getEngineCode() { return engineCode; }
    public VehicleSpecs getSpecs() { return specs; }
}
