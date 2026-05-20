import { useEffect, useState } from "react";
import { getFarmerProfile } from "../services/farmerService";
import { useAuth } from "../auth/AuthContext";

export const useFarmerProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      setLoading(true);
      const data = await getFarmerProfile(user.uid);
      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  return { profile, setProfile, loading };
};
