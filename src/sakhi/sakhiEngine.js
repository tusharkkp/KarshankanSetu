/**
 * Sakhi Core Reasoning Engine (Rule-based)
 */
export const runSakhiEngine = ({ question, context }) => {
  if (!question || !context) {
    return {
      answer: "I need more information to help you.",
      confidence: 30,
      signalsUsed: [],
    };
  }

  const q = question.toLowerCase();
  const { derivedSignals, activities, farmer } = context;

  let confidence = 50;
  const signalsUsed = [];

  // RULE: Spraying related
  if (q.includes("spray")) {
    if (derivedSignals.rainRisk === "HIGH") {
      confidence += 30;
      signalsUsed.push("rainRisk");

      // Check recent spraying
      const recentSpray = activities.find(
        (a) => a.type === "Spraying" && a.daysAgo <= 2
      );

      if (recentSpray) {
        confidence += 10;
        signalsUsed.push("recentSpraying");
      }

      return {
        answer: `Avoid spraying today. Rain is expected and it may reduce effectiveness on your ${farmer.crop}.`,
        confidence,
        signalsUsed,
      };
    }

    return {
      answer: `Weather conditions look suitable. You may proceed with spraying on your ${farmer.crop}.`,
      confidence: confidence + 10,
      signalsUsed: ["weatherClear"],
    };
  }

  // RULE: Irrigation related
  if (q.includes("irrigat") || q.includes("water")) {
    if (derivedSignals.heatStress === "HIGH") {
      confidence += 30;
      signalsUsed.push("heatStress");

      return {
        answer: `High temperature detected. Irrigate your ${farmer.crop} early morning or late evening.`,
        confidence,
        signalsUsed,
      };
    }

    return {
      answer: `Current temperature is normal. Continue regular irrigation for your ${farmer.crop}.`,
      confidence: confidence + 10,
      signalsUsed: ["normalTemp"],
    };
  }

  // FALLBACK
  return {
    answer:
      "I'm still learning. Please ask about spraying, irrigation, or crop care.",
    confidence: 40,
    signalsUsed: [],
  };
};
