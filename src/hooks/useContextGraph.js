import { useEffect, useState } from "react";
import { useFarmerProfile } from "./useFarmerProfile";
import { useTodayCompanion } from "./useTodayCompanion";
import { useActivities } from "./useActivities";
import { buildContextGraph } from "../context/contextGraphBuilder";

export const useContextGraph = () => {
  const { profile } = useFarmerProfile();
  const { weather } = useTodayCompanion();
  const { activities } = useActivities(5);

  const [context, setContext] = useState(null);

  useEffect(() => {
    if (!profile || !weather) return;

    const ctx = buildContextGraph({
      profile,
      weather,
      activities,
    });

    setContext(ctx);
  }, [profile, weather, activities]);

  return context;
};
