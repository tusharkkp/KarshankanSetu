import { useState } from "react";
import { Bell, Clock, TrendingUp, TrendingDown, DollarSign, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";

const Alerts = () => {
  const [alertSettings, setAlertSettings] = useState({
    marketPrices: true,
    weatherWarnings: true,
    schemeDeadlines: true,
    farmingReminders: true,
    pestAlerts: true
  });

  const marketAlerts = [
    {
      id: 1,
      title: "Cardamom Prices Up 15%",
      description: "Cardamom prices increased to ₹1,850/kg in Kumily market",
      type: "price-up",
      timestamp: "30 minutes ago",
      action: "Consider selling surplus stock"
    },
    {
      id: 2,
      title: "Black Pepper Export Demand High",
      description: "Export demand surge pushing pepper prices to ₹520/kg",
      type: "price-up",
      timestamp: "2 hours ago",
      action: "Good time to negotiate with buyers"
    },
    {
      id: 3,
      title: "Coffee Prices Stable",
      description: "Arabica coffee maintaining ₹450/kg, no major fluctuations",
      type: "neutral",
      timestamp: "1 day ago",
      action: "Hold and monitor trends"
    }
  ];

  const farmingReminders = [
    {
      id: 4,
      title: "Irrigation Reminder",
      description: "Time for evening irrigation - cardamom section needs watering",
      type: "farming",
      timestamp: "15 minutes ago",
      action: "Check soil moisture before watering"
    },
    {
      id: 5,
      title: "Fertilizer Application Due",
      description: "Monthly organic fertilizer application due for pepper vines",
      type: "farming",
      timestamp: "1 hour ago",
      action: "Apply early morning for best results"
    }
  ];

  const schemeAlerts = [
    {
      id: 6,
      title: "PM-KISAN Payment Released",
      description: "₹2,000 installment credited to your account",
      type: "scheme",
      timestamp: "2 days ago",
      action: "Check bank account for confirmation"
    },
    {
      id: 7,
      title: "PMFBY Enrollment Deadline",
      description: "Crop insurance enrollment closes in 5 days",
      type: "deadline",
      timestamp: "3 days ago",
      action: "Complete enrollment at nearest CSC"
    }
  ];

  const AlertCard = ({ alert }: { alert: any }) => {
    const getIcon = () => {
      switch (alert.type) {
        case "price-up": return <TrendingUp className="h-5 w-5 text-green-600" />;
        case "price-down": return <TrendingDown className="h-5 w-5 text-red-600" />;
        case "farming": return <Clock className="h-5 w-5 text-blue-600" />;
        case "scheme": return <DollarSign className="h-5 w-5 text-purple-600" />;
        case "deadline": return <Calendar className="h-5 w-5 text-orange-600" />;
        default: return <Bell className="h-5 w-5 text-gray-600" />;
      }
    };

    const getBadgeVariant = () => {
      switch (alert.type) {
        case "price-up": return "default";
        case "price-down": return "destructive";
        case "farming": return "secondary";
        case "scheme": return "outline";
        case "deadline": return "default";
        default: return "secondary";
      }
    };

    return (
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-muted">
                {getIcon()}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{alert.title}</CardTitle>
                <CardDescription className="mt-1">{alert.description}</CardDescription>
              </div>
            </div>
            <Badge variant={getBadgeVariant()}>
              {alert.type.replace('-', ' ')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-primary/5 rounded-lg p-3 mb-3">
            <p className="text-sm font-medium text-primary">{alert.action}</p>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{alert.timestamp}</span>
            <Button variant="ghost" size="sm">Mark as Read</Button>
          </div>
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
            <h1 className="text-3xl font-bold text-primary mb-2">Alerts & Reminders</h1>
            <p className="text-muted-foreground">Stay updated with market prices, farming schedules, and government schemes</p>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Alerts</TabsTrigger>
              <TabsTrigger value="market">Market Prices</TabsTrigger>
              <TabsTrigger value="farming">Farm Reminders</TabsTrigger>
              <TabsTrigger value="schemes">Schemes & Policies</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {[...marketAlerts, ...farmingReminders, ...schemeAlerts]
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
            </TabsContent>

            <TabsContent value="market" className="space-y-4">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Current Market Prices</CardTitle>
                  <CardDescription>Live prices from major Kerala markets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <h4 className="font-semibold">Cardamom</h4>
                      <p className="text-2xl font-bold text-green-600">₹1,850</p>
                      <p className="text-sm text-muted-foreground">per kg</p>
                      <p className="text-xs text-green-600">↑ +15%</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h4 className="font-semibold">Black Pepper</h4>
                      <p className="text-2xl font-bold text-green-600">₹520</p>
                      <p className="text-sm text-muted-foreground">per kg</p>
                      <p className="text-xs text-green-600">↑ +8%</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h4 className="font-semibold">Coffee</h4>
                      <p className="text-2xl font-bold text-gray-600">₹450</p>
                      <p className="text-sm text-muted-foreground">per kg</p>
                      <p className="text-xs text-gray-600">→ 0%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {marketAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </TabsContent>

            <TabsContent value="farming" className="space-y-4">
              {farmingReminders.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </TabsContent>

            <TabsContent value="schemes" className="space-y-4">
              {schemeAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </TabsContent>
          </Tabs>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Alert Preferences
              </CardTitle>
              <CardDescription>Customize which alerts you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Alert Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="market-prices">Market Price Updates</Label>
                      <Switch
                        id="market-prices"
                        checked={alertSettings.marketPrices}
                        onCheckedChange={(checked) => 
                          setAlertSettings({...alertSettings, marketPrices: checked})
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="weather-warnings">Weather Warnings</Label>
                      <Switch
                        id="weather-warnings"
                        checked={alertSettings.weatherWarnings}
                        onCheckedChange={(checked) => 
                          setAlertSettings({...alertSettings, weatherWarnings: checked})
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="scheme-deadlines">Scheme Deadlines</Label>
                      <Switch
                        id="scheme-deadlines"
                        checked={alertSettings.schemeDeadlines}
                        onCheckedChange={(checked) => 
                          setAlertSettings({...alertSettings, schemeDeadlines: checked})
                        }
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Delivery Preferences</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>Push Notifications</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>SMS Alerts</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>Email Summary (Daily)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>WhatsApp Updates</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Alerts;