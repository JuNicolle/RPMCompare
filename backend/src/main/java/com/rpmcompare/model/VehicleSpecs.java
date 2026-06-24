package com.rpmcompare.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "vehicle_specs")
public class VehicleSpecs {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    private VehicleModel model;

    @Column(name = "engine_description") private String engineDescription;
    private String fuel;
    @Column(name = "displacement_cc") private Integer displacementCc;
    private Short cylinders;
    private Boolean turbo;
    @Column(name = "power_hp")   private Short powerHp;
    @Column(name = "torque_nm")  private Short torqueNm;
    private String gearbox;
    private String drive;
    @Column(name = "accel_0_100") private BigDecimal accel0100;
    @Column(name = "vmax_kph")   private Short vmaxKph;
    @Column(name = "weight_kg")  private Short weightKg;

    public String getEngineDescription() { return engineDescription; }
    public String getFuel() { return fuel; }
    public Integer getDisplacementCc() { return displacementCc; }
    public Short getCylinders() { return cylinders; }
    public Boolean getTurbo() { return turbo; }
    public Short getPowerHp() { return powerHp; }
    public Short getTorqueNm() { return torqueNm; }
    public String getGearbox() { return gearbox; }
    public String getDrive() { return drive; }
    public BigDecimal getAccel0100() { return accel0100; }
    public Short getVmaxKph() { return vmaxKph; }
    public Short getWeightKg() { return weightKg; }
}
