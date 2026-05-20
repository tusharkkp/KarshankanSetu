const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Fetch current weather by city/district name
 */
export const getWeatherByLocation = async (location) => {
  if (!location) return null;

  const query = location.district || location.village || location.state;
  if (!query) return null;

  const url = `${BASE_URL}?q=${encodeURIComponent(
    query
  )}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();

  return {
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    rainProbability: data.rain ? 60 : 0, // OpenWeather free tier limitation
    city: data.name,
  };
};
