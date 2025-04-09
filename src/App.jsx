// App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CitySearch from './components/CitySearch/CitySearch'
import WeatherCard from './components/WeatherCard/WeatherCard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
      <h1 className="weather-title">Weather App</h1>
        <br></br>
        <Routes>
          <Route path="/" element={<CitySearch />} />
          <Route path="/weather" element={<WeatherCard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
