import { useState, useEffect } from 'react'

const API_KEY = ""; // Clave de API proporcionada por AccuWeather, hay que logearse
const BASE_URL = "http://api.weatherapi.com/v1/search.json";

//Servicio de autocompletado al buscar la ciudad por su nombre
export function useCityAutocomplete(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      setLoading(true);
      setError(null);

      fetch(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}`, {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error fetching city data");
          return res.json();
        })
        .then((data) => {
          setResults(data || []);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  return { results, loading, error };
}

//Servicio que usa el nombre de la ciudad para encontrar su locationKey y dar el clima  
export const useCityWeather = (cityName) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //console.log("useCityWeather: useEffect ejecutado", cityName);
    if (!cityName) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=47eafde3dbc94afb8fa01924250904&q=${cityName}&days=3&aqi=no&alerts=no`);
        const data = await response.json();
        console.log('Weather API Response:', data); // Verifica la respuesta de la API

        if (data && data.current && data.forecast && data.location) {
          setWeather({
            current: data.current, // El clima actual
            forecast: data.forecast, // Pronóstico
            location: data.location, // Información sobre la ciudad
          });
        } else {
          setError("Datos del clima no disponibles");
        }
      } catch (err) {
        setError("Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [cityName]);

  return { weather, loading, error };
};

