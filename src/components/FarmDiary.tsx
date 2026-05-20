import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Camera, Mic, Plus, Droplets, Sprout, Bug, Scissors } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useActivities } from "@/hooks/useActivities";
import { addActivity } from "@/services/activityService";

const activityTypes = [
  { type: "Irrigation", icon: Droplets, color: "from-blue-500 to-cyan-600", label: "Irrigation" },
  { type: "Planting", icon: Sprout, color: "from-green-500 to-emerald-600", label: "Planting" },
  { type: "Pest Control", icon: Bug, color: "from-orange-500 to-red-600", label: "Pest Control" },
  { type: "Harvest", icon: Scissors, color: "from-purple-500 to-violet-600", label: "Harvest" }
];

const getActivityColor = (type: string) => {
  const activityType = activityTypes.find(at => at.type === type);
  return activityType?.color || "from-gray-500 to-gray-600";
};

const getActivityIcon = (type: string) => {
  const activityType = activityTypes.find(at => at.type === type);
  return activityType?.icon || Droplets;
};

const FarmDiary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { activities, loading, refetch } = useActivities(10);
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedType || !description.trim() || !crop.trim()) return;
    setSubmitting(true);
    try {
      await addActivity(user.uid, {
        type: selectedType,
        description: description.trim(),
        crop: crop.trim(),
      });
      setSelectedType("");
      setDescription("");
      setCrop("");
      await refetch();
      alert("Activity logged successfully");
    } catch (err) {
      console.error("Activity add error:", err);
      alert("Failed to log activity. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimestamp = (ts: unknown) => {
    if (!ts) return "";
    if (typeof (ts as { toDate?: () => Date }).toDate === "function") {
      const d = (ts as { toDate: () => Date }).toDate();
      return d.toLocaleDateString() + " at " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return String(ts);
  };

  return (
    <section id="diary" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Digital Farm
              <span className="block text-primary">Diary</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track every farming activity with voice notes and photos. Build valuable 
              data for learning, insurance claims, and better decision making.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Add New Entry */}
            <div className="lg:col-span-1">
              <Card className="feature-card sticky top-24 p-5 sm:p-6 shadow-md">
                <h3 className="text-xl font-semibold text-foreground mb-5">Log New Activity</h3>

                <form onSubmit={handleAddActivity} className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {activityTypes.map((activity, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant={selectedType === activity.type ? "default" : "outline"}
                        className="h-16 w-full rounded-xl flex flex-col items-center justify-center gap-1"
                        onClick={() => setSelectedType(activity.type)}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activity.color} flex items-center justify-center`}>
                          <activity.icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xs font-medium">{activity.label}</span>
                      </Button>
                    ))}
                  </div>
                  <div>
                    <Label htmlFor="activity-desc">Description</Label>
                    <Textarea
                      id="activity-desc"
                      placeholder="e.g. Pesticide spray for tomato"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 min-h-[80px]"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity-crop">Crop</Label>
                    <Input
                      id="activity-crop"
                      placeholder="e.g. Tomato"
                      value={crop}
                      onChange={(e) => setCrop(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                    disabled={submitting || !selectedType || !description.trim() || !crop.trim()}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {submitting ? "Logging..." : "Log Activity"}
                  </Button>
                </form>

                <div className="mt-4 space-y-2">
                  <Button className="w-full justify-start rounded-xl py-3 px-4 gap-2" variant="outline" type="button">
                    <Mic className="h-4 w-4" />
                    <span className="text-sm font-medium">Record Voice Note</span>
                  </Button>
                  <Button className="w-full justify-start rounded-xl py-3 px-4 gap-2" variant="outline" type="button">
                    <Camera className="h-4 w-4" />
                    <span className="text-sm font-medium">Add Photos</span>
                  </Button>
                </div>

                {/* Privacy Note */}
                <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    🔒 Your farm data is secure and private. Share selectively for
                    insurance claims or expert consultations.
                  </p>
                </div>
              </Card>
            </div>

            {/* Activity Timeline */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Recent Activities</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/app/activities')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </div>

              {loading ? (
                <p className="text-muted-foreground">Loading activities...</p>
              ) : (
                <div className="space-y-6">
                  {activities.map((activity, index) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="relative">
                        {index < activities.length - 1 && (
                          <div className="timeline-line"></div>
                        )}
                        <div className="timeline-item">
                          <Card className="feature-card ml-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${getActivityColor(activity.type)} rounded-lg flex items-center justify-center`}>
                                  <Icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-foreground">{activity.type}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {formatTimestamp(activity.timestamp)}
                                  </p>
                                </div>
                              </div>
                              {activity.crop && (
                                <span className="text-xs text-muted-foreground">{activity.crop}</span>
                              )}
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {activity.description}
                            </p>
                          </Card>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {!loading && activities.length === 0 && (
                <p className="text-muted-foreground">No activities yet. Log one above.</p>
              )}

              <div className="text-center mt-8">
                <Button variant="outline" onClick={() => navigate('/app/activities')}>
                  Load More Activities
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmDiary;