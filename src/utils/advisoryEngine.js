/**
 * Generate farming advisories based on weather & farmer profile
 */
export const generateAdvisories = ({ weather, profile }) => {
  const advisories = [];

  if (!weather || !profile) return advisories;

  const { temperature, rainProbability, windSpeed } = weather;
  const crop = profile?.farm?.primaryCrop || "your crop";

  // Rain-based advice
  if (rainProbability >= 60) {
    advisories.push(
      `🌧️ Rain expected today — avoid spraying on ${crop}.`
    );
  }

  // Heat-based advice
  if (temperature >= 35) {
    advisories.push(
      `🔥 High temperature detected — irrigate ${crop} early morning or late evening.`
    );
  }

  // Wind-based advice
  if (windSpeed >= 8) {
    advisories.push(
      `🌬️ Strong winds — postpone pesticide application for ${crop}.`
    );
  }

  // Default fallback
  if (advisories.length === 0) {
    advisories.push(
      `✅ Weather looks normal — continue regular farming activities for ${crop}.`
    );
  }

  return advisories;
};
