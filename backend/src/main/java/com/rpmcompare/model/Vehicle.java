package com.rpmcompare.model;

public class Vehicle {
    private String brand;
    private String model;
    private String full;
    private String year;
    private String engine;
    private String code;
    private String displacement;
    private String fuel;
    private String gearbox;
    private String drive;
    private int power;
    private int torque;
    private String weight;
    private String accel;
    private String vmax;
    private String plate;

    public Vehicle() {}

    public Vehicle(String brand, String model, String full, String year,
                   String engine, String code, String displacement, String fuel,
                   String gearbox, String drive, int power, int torque,
                   String weight, String accel, String vmax, String plate) {
        this.brand = brand;
        this.model = model;
        this.full = full;
        this.year = year;
        this.engine = engine;
        this.code = code;
        this.displacement = displacement;
        this.fuel = fuel;
        this.gearbox = gearbox;
        this.drive = drive;
        this.power = power;
        this.torque = torque;
        this.weight = weight;
        this.accel = accel;
        this.vmax = vmax;
        this.plate = plate;
    }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public String getFull() { return full; }
    public void setFull(String full) { this.full = full; }
    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
    public String getEngine() { return engine; }
    public void setEngine(String engine) { this.engine = engine; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getDisplacement() { return displacement; }
    public void setDisplacement(String displacement) { this.displacement = displacement; }
    public String getFuel() { return fuel; }
    public void setFuel(String fuel) { this.fuel = fuel; }
    public String getGearbox() { return gearbox; }
    public void setGearbox(String gearbox) { this.gearbox = gearbox; }
    public String getDrive() { return drive; }
    public void setDrive(String drive) { this.drive = drive; }
    public int getPower() { return power; }
    public void setPower(int power) { this.power = power; }
    public int getTorque() { return torque; }
    public void setTorque(int torque) { this.torque = torque; }
    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }
    public String getAccel() { return accel; }
    public void setAccel(String accel) { this.accel = accel; }
    public String getVmax() { return vmax; }
    public void setVmax(String vmax) { this.vmax = vmax; }
    public String getPlate() { return plate; }
    public void setPlate(String plate) { this.plate = plate; }
}
