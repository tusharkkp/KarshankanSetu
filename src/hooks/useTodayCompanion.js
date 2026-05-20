import { useEffect, useState } from "react";
import { getWeatherByLocation } from "../services/weatherService";
import { generateAdvisories } from "../utils/advisoryEngine";
import { useFarmerProfile } from "./useFarmerProfile";

export const useTodayCompanion = () => {
  const { profile, loading: profileLoading } = useFarmerProfile();
  const [weather, setWeather] = useState(null);
  const [advisories, setAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) {
      setLoading(false);
      return;
    }

    const run = async () => {
      setLoading(true);
      try {
        const weatherData = await getWeatherByLocation(profile.location);
        setWeather(weatherData);

        const advice = generateAdvisories({
          weather: weatherData,
          profile,
        });
        setAdvisories(advice);
      } catch (err) {
        console.error("Weather error:", err);
        setAdvisories([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [profile]);

  return {
    profile,
    weather,
    advisories,
    loading: loading || profileLoading,
  };
};
