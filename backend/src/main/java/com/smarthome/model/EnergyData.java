package com.smarthome.model;

public class EnergyData {
    private int voltage;
    private double current;
    private int power;

    public EnergyData() {
    }

    public EnergyData(int voltage, double current, int power) {
        this.voltage = voltage;
        this.current = current;
        this.power = power;
    }

    public int getVoltage() {
        return voltage;
    }

    public void setVoltage(int voltage) {
        this.voltage = voltage;
    }

    public double getCurrent() {
        return current;
    }

    public void setCurrent(double current) {
        this.current = current;
    }

    public int getPower() {
        return power;
    }

    public void setPower(int power) {
        this.power = power;
    }
}
