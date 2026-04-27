package com.smarthome.controller;

import com.smarthome.model.Device;
import com.smarthome.model.EnergyData;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*") // Allow requests from React frontend
public class SmartHomeController {

    private List<Device> devices = new ArrayList<>();

    public SmartHomeController() {
        // Initialize with default devices
        devices.add(new Device("1", "Light", "OFF"));
        devices.add(new Device("2", "Fan", "OFF"));
        devices.add(new Device("3", "AC", "OFF"));
    }

    @GetMapping("/devices")
    public List<Device> getDevices() {
        return devices;
    }

    @PostMapping("/devices/{id}")
    public Device toggleDevice(@PathVariable String id) {
        for (Device device : devices) {
            if (device.getId().equals(id)) {
                // Toggle status
                if ("ON".equals(device.getStatus())) {
                    device.setStatus("OFF");
                } else {
                    device.setStatus("ON");
                }
                return device;
            }
        }
        return null;
    }

    @GetMapping("/energy")
    public EnergyData getEnergyData() {
        // Return dummy energy data
        return new EnergyData(220, 5.2, 1144);
    }
}
