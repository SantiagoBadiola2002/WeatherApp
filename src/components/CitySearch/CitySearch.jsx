import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCityAutocomplete, useCityWeather } from "../../services/weatherService";
import "./CitySearch.css";

export default function CitySearch() {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { results: cities, loading, error } = useCityAutocomplete(query);
  const cityName = selectedCity ? `${selectedCity.name}, ${selectedCity.country}` : "";
  const { weather, loading: loadingWeather, error: weatherError } = useCityWeather(cityName);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    setSelectedCity(null);
  };

  const handleSelectCity = (city) => {
    console.log("Ciudad seleccionada:", `${city.name}, ${city.country}`);
    setSelectedCity(city);
    setQuery(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (cities.length > 0) setShowSuggestions(true);
  };

  // 🚀 Cuando el clima esté disponible, navegamos a /weather
  useEffect(() => {
    if (selectedCity && weather) {
      navigate("/weather", {
        state: {
          city: selectedCity,
          weather,
        },
      });
    }
  }, [selectedCity, weather, navigate]);

  return (
    <div className="search-container p-4 max-w-md mx-auto">
      <div className="input-wrapper relative">
        <input
          type="text"
          placeholder="Buscar ciudad..."
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          className="search-input w-full p-2 mb-2"
        />

        {!selectedCity && (
          <p className="text-sm text-gray-400 mb-2">
            Ingresa el nombre de una ciudad para ver el clima
          </p>
        )}

        {loading && <p className="text-sm text-gray-400">Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className={`autocomplete-list ${showSuggestions && cities.length ? "active" : ""}`}>
          {cities.map((city) => (
            <li
              key={`${city.id || city.name}-${city.region}`}
              className="autocomplete-item border-b py-1 cursor-pointer"
              onClick={() => handleSelectCity(city)}
            >
              {city.name}, {city.region}, {city.country}
            </li>
          ))}
        </ul>
      </div>

      {weatherError && <p className="text-red-500">{weatherError}</p>}
    </div>
  );
}
