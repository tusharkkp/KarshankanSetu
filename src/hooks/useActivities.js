import { useEffect, useState, useCallback } from "react";
import { getRecentActivities } from "../services/activityService";
import { useAuth } from "../auth/AuthContext";

export const useActivities = (max = 10) => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const data = await getRecentActivities(user.uid, max);
    setActivities(data);
    setLoading(false);
  }, [user, max]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    refetch();
  }, [user, refetch]);

  return { activities, loading, refetch };
};
