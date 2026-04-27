import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [devices, setDevices] = useState([])
  const [energyData, setEnergyData] = useState(null)

  useEffect(() => {
    // Fetch devices
    fetch('http://localhost:9092/devices')
      .then(response => response.json())
      .then(data => setDevices(data))
      .catch(error => console.error("Error fetching devices: ", error));

    // Fetch energy data
    fetch('http://localhost:9092/energy')
      .then(response => response.json())
      .then(data => setEnergyData(data))
      .catch(error => console.error("Error fetching energy: ", error));
  }, [])

  const toggleDevice = (id) => {
    fetch(`http://localhost:9092/devices/${id}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(updatedDevice => {
        // Update device status in state
        setDevices(devices.map(device => 
          device.id === updatedDevice.id ? updatedDevice : device
        ))
      })
      .catch(error => console.error("Error toggling device: ", error));
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Smart Home Dashboard</h1>
      </header>

      <main className="main-content">
        <section className="devices-section">
          <h2>Devices</h2>
          <div className="cards-grid">
            {devices.map(device => (
              <div key={device.id} className="card">
                <h3>{device.name}</h3>
                <p>Status: <span className="status-badge" style={{ color: device.status === 'ON' ? '#2ecc71' : '#e74c3c' }}>{device.status}</span></p>
                <button 
                  className={device.status === 'ON' ? 'btn-on' : 'btn-off'}
                  onClick={() => toggleDevice(device.id)}
                >
                  Turn {device.status === 'ON' ? 'OFF' : 'ON'}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="energy-section">
          <h2>Energy Usage</h2>
          {energyData ? (
            <div className="energy-card">
              <div className="energy-item">
                <span>Voltage</span>
                <strong>{energyData.voltage} V</strong>
              </div>
              <div className="energy-item">
                <span>Current</span>
                <strong>{energyData.current} A</strong>
              </div>
              <div className="energy-item">
                <span>Power</span>
                <strong>{energyData.power} W</strong>
              </div>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Loading energy data...</p>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
