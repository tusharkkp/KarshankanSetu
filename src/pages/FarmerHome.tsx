import Header from "@/components/Header";
import { useTodayCompanion } from "@/hooks/useTodayCompanion";

const FarmerHome = () => {
  const { profile, weather, advisories, loading } = useTodayCompanion();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-header">
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground">Loading today's insights...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-header">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-2">Today's Farming Companion</h1>
          <p className="text-muted-foreground mb-6">Your personalized farming dashboard</p>

          <h2 className="text-xl font-semibold text-foreground mb-2">
            Good day, {profile?.name || "Farmer"} 🌱
          </h2>

          {weather && (
            <div className="mb-6 p-4 rounded-lg border bg-card text-card-foreground">
              <p className="text-sm text-muted-foreground">
                📍 {weather.city} | 🌡️ {Math.round(weather.temperature)}°C | 💧 {weather.humidity}% | 🌬️ {weather.windSpeed} m/s
              </p>
            </div>
          )}

          <div className="space-y-2">
            {advisories.map((msg, idx) => (
              <div key={idx} className="text-sm text-foreground">
                {msg}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerHome;
