import { useState } from "react";
import { Cloud, Bug, Droplets, ThermometerSun, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";

const Advisories = () => {
  const [feedbackGiven, setFeedbackGiven] = useState<{[key: number]: boolean}>({});

  const handleFeedback = (advisoryId: number, helpful: boolean) => {
    setFeedbackGiven({...feedbackGiven, [advisoryId]: true});
    // Send feedback to backend
  };

  const weatherAdvisories = [
    {
      id: 1,
      title: "Heavy Rain Alert - Adjust Irrigation",
      description: "Heavy rainfall expected in next 2 days. Reduce irrigation for cardamom and pepper plants to prevent waterlogging.",
      priority: "high",
      icon: Cloud,
      action: "Reduce watering by 70% until Friday",
      crops: ["Cardamom", "Black Pepper"],
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Temperature Rise - Shade Management",
      description: "Temperature expected to rise above 32°C. Ensure adequate shade for young coffee plants.",
      priority: "medium",
      icon: ThermometerSun,
      action: "Provide shade nets for coffee seedlings",
      crops: ["Coffee"],
      timestamp: "4 hours ago"
    }
  ];

  const pestAdvisories = [
    {
      id: 3,
      title: "Cardamom Thrips Activity Detected",
      description: "Increased thrips activity reported in nearby farms. Monitor your cardamom plants for silver-colored streaks on leaves.",
      priority: "high",
      icon: Bug,
      action: "Apply neem oil spray early morning",
      crops: ["Cardamom"],
      timestamp: "1 day ago"
    }
  ];

  const growthAdvisories = [
    {
      id: 4,
      title: "Flowering Stage - Nutrition Boost",
      description: "Your cardamom plants are entering flowering stage. Time for potassium-rich fertilizer application.",
      priority: "medium",
      icon: TrendingUp,
      action: "Apply banana peel compost or wood ash",
      crops: ["Cardamom"],
      timestamp: "2 days ago"
    },
    {
      id: 5,
      title: "Coffee Berry Development",
      description: "Coffee berries are developing well. Maintain consistent moisture levels and avoid over-fertilization.",
      priority: "low",
      icon: Droplets,
      action: "Monitor soil moisture daily",
      crops: ["Coffee"],
      timestamp: "3 days ago"
    }
  ];

  const AdvisoryCard = ({ advisory }: { advisory: any }) => {
    const IconComponent = advisory.icon;
    const isHelpful = feedbackGiven[advisory.id];
    
    return (
      <Card className={`transition-all duration-300 ${
        advisory.priority === "high" ? "border-red-200 bg-red-50/50" :
        advisory.priority === "medium" ? "border-yellow-200 bg-yellow-50/50" :
        "border-green-200 bg-green-50/50"
      }`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                advisory.priority === "high" ? "bg-red-100 text-red-600" :
                advisory.priority === "medium" ? "bg-yellow-100 text-yellow-600" :
                "bg-green-100 text-green-600"
              }`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{advisory.title}</CardTitle>
                <CardDescription className="mt-1">{advisory.description}</CardDescription>
              </div>
            </div>
            <Badge variant={
              advisory.priority === "high" ? "destructive" :
              advisory.priority === "medium" ? "default" : "secondary"
            }>
              {advisory.priority}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/5 rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">Recommended Action:</h4>
            <p className="text-sm">{advisory.action}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {advisory.crops.map((crop: string) => (
                <Badge key={crop} variant="outline" className="text-xs">
                  {crop}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{advisory.timestamp}</span>
          </div>
          
          {!isHelpful && (
            <div className="flex items-center gap-2 pt-2 border-t">
              <span className="text-sm text-muted-foreground">Was this helpful?</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleFeedback(advisory.id, true)}
                className="gap-1"
              >
                <CheckCircle className="h-3 w-3" />
                Yes
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleFeedback(advisory.id, false)}
                className="gap-1"
              >
                <AlertTriangle className="h-3 w-3" />
                No
              </Button>
            </div>
          )}
          
          {isHelpful && (
            <div className="flex items-center gap-2 pt-2 border-t">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Thank you for your feedback!</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-header">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Smart Advisories</h1>
            <p className="text-muted-foreground">AI-powered farming recommendations tailored to your crops and conditions</p>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Advisories</TabsTrigger>
              <TabsTrigger value="weather">Weather-Based</TabsTrigger>
              <TabsTrigger value="pest">Pest & Disease</TabsTrigger>
              <TabsTrigger value="growth">Growth Stage</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {[...weatherAdvisories, ...pestAdvisories, ...growthAdvisories]
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((advisory) => (
                  <AdvisoryCard key={advisory.id} advisory={advisory} />
                ))}
            </TabsContent>

            <TabsContent value="weather" className="space-y-4">
              {weatherAdvisories.map((advisory) => (
                <AdvisoryCard key={advisory.id} advisory={advisory} />
              ))}
            </TabsContent>

            <TabsContent value="pest" className="space-y-4">
              {pestAdvisories.map((advisory) => (
                <AdvisoryCard key={advisory.id} advisory={advisory} />
              ))}
            </TabsContent>

            <TabsContent value="growth" className="space-y-4">
              {growthAdvisories.map((advisory) => (
                <AdvisoryCard key={advisory.id} advisory={advisory} />
              ))}
            </TabsContent>
          </Tabs>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Advisory Settings</CardTitle>
              <CardDescription>Customize how you receive farming advisories</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Delivery Methods</h4>
                <div className="space-y-1 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span>In-App Notifications</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span>SMS Alerts</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Voice Calls (Critical only)</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Priority Levels</h4>
                <div className="space-y-1 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span>High Priority (Immediate action needed)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span>Medium Priority (Plan for action)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Low Priority (General tips)</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Advisories;