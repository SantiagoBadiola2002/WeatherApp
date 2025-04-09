import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './WeatherCard.css'; // Importa el archivo CSS

const WeatherCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, weather } = location.state || {};

  // Si no hay datos, redirigir al inicio
  if (!city || !weather) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 mb-4">No hay datos disponibles.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
    );
  }

  const { name, region, country } = city;
  const { current, forecast } = weather;

  return (
    <div className="weather-card">
      {/* Botón flotante para volver al inicio */}
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        Volver
      </button>

      {/* Datos actuales */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">
          {name}, {region}, {country}
        </h2>
        <p className="text-gray-600 mb-2">{current.condition.text}</p>
        <div className="current-weather">
          <img
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            className="weather-icon"
          />
          <div className="weather-info">
            <p className="temperature">{current.temp_c}°C</p>
            <p className="text-gray-500 text-sm">Humedad: {current.humidity}%</p>
            <p className="text-gray-500 text-sm">Viento: {current.wind_kph} km/h</p>
          </div>
        </div>
      </div>

      {/* Predicción futura */}
      <div>
        <h3 className="text-lg font-medium mb-2">Próximos días</h3>
        <div className="forecast">
          {forecast.forecastday.map((day) => (
            <div
              key={day.date}
              className="forecast-day"
            >
              <p className="date">
                {new Date(day.date).toLocaleDateString("es-UY", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
              />
              <p className="text-sm">{day.day.condition.text}</p>
              <p className="text-sm text-gray-600">
                {day.day.mintemp_c}° / {day.day.maxtemp_c}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
