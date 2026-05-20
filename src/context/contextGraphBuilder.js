/**
 * Build a context graph for Sakhi reasoning
 */
export const buildContextGraph = ({
  profile,
  weather,
  activities,
}) => {
  if (!profile || !weather) return null;

  const now = Date.now();

  // Normalize activities
  const normalizedActivities = (activities || []).map((a) => {
    const ts = a.timestamp?.toDate
      ? a.timestamp.toDate().getTime()
      : now;

    const daysAgo = Math.floor((now - ts) / (1000 * 60 * 60 * 24));

    return {
      type: a.type,
      crop: a.crop,
      daysAgo,
    };
  });

  // Derived signals
  const rainRisk =
    weather.rainProbability >= 60 ? "HIGH" : "LOW";

  const heatStress =
    weather.temperature >= 35 ? "HIGH" : "LOW";

  const windRisk =
    weather.windSpeed >= 8 ? "HIGH" : "LOW";

  return {
    farmer: {
      name: profile.name,
      crop: profile.farm?.primaryCrop,
      location: profile.location,
    },

    weather: {
      temperature: weather.temperature,
      rainProbability: weather.rainProbability,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
      summary: weather.description,
    },

    activities: normalizedActivities,

    derivedSignals: {
      rainRisk,
      heatStress,
      windRisk,
    },

    generatedAt: new Date(),
  };
};
