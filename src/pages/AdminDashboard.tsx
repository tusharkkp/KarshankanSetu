import { useState } from "react";
import { Users, MessageCircle, TrendingUp, Bell, Calendar, BarChart3, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AdminDashboard = () => {
  const [activeUsers, setActiveUsers] = useState(1247);
  const [totalQueries, setTotalQueries] = useState(3456);

  const recentActivity = [
    {
      id: 1,
      user: "രാജേഷ് കുമാർ",
      action: "Asked about cardamom pest control",
      timestamp: "2 minutes ago",
      location: "Wayanad"
    },
    {
      id: 2,
      user: "സുമിത്ര രാജ്",
      action: "Updated farm diary - irrigation log",
      timestamp: "5 minutes ago",
      location: "Idukki"
    },
    {
      id: 3,
      user: "മുരളി മേനോൻ",
      action: "Checked market prices for black pepper",
      timestamp: "8 minutes ago",
      location: "Kottayam"
    },
    {
      id: 4,
      user: "ലീല കുമാരി",
      action: "Received weather advisory alert",
      timestamp: "12 minutes ago",
      location: "Palakkad"
    }
  ];

  const systemStats = [
    {
      title: "Active Farmers",
      value: "1,247",
      change: "+23 today",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "AI Queries Today",
      value: "856",
      change: "+15% vs yesterday",
      icon: MessageCircle,
      color: "text-green-600"
    },
    {
      title: "Advisories Sent",
      value: "342",
      change: "Weather + Pest alerts",
      icon: Bell,
      color: "text-orange-600"
    },
    {
      title: "Knowledge Views",
      value: "1,923",
      change: "+8% this week",
      icon: BarChart3,
      color: "text-purple-600"
    }
  ];

  const pendingActions = [
    {
      id: 1,
      title: "Review New Pest Report",
      description: "Coffee leaf rust reported in 3 Wayanad farms",
      priority: "high",
      assignee: "Dr. Priya Nair - Plant Pathologist"
    },
    {
      id: 2,
      title: "Update Market Prices",
      description: "Weekly spice market data from Kumily needs verification",
      priority: "medium",
      assignee: "Market Intelligence Team"
    },
    {
      id: 3,
      title: "Content Review - Malayalam",
      description: "New cardamom cultivation guide awaiting approval",
      priority: "medium",
      assignee: "Content Team"
    },
    {
      id: 4,
      title: "User Support Escalation",
      description: "Farmer unable to access scheme enrollment",
      priority: "high",
      assignee: "Technical Support"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">K</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary">Karshakan Setu</h1>
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                System Online
              </Badge>
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">Admin Control Panel</h2>
          <p className="text-muted-foreground">Monitor system activity and manage farming support services</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Activity</CardTitle>
                  <CardDescription>Latest farmer interactions with the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {activity.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {activity.location}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {activity.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Actions</CardTitle>
                  <CardDescription>Items requiring admin attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingActions.map((action) => (
                      <div key={action.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{action.title}</h4>
                          <Badge variant={
                            action.priority === "high" ? "destructive" : "default"
                          } className="text-xs">
                            {action.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {action.description}
                        </p>
                        <p className="text-xs text-primary">
                          Assigned: {action.assignee}
                        </p>
                        <Button size="sm" className="mt-2 text-xs">
                          Take Action
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health & Performance</CardTitle>
                <CardDescription>Current system status and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">AI Response Time</h4>
                    <p className="text-2xl font-bold text-green-600">1.2s</p>
                    <p className="text-xs text-muted-foreground">Average response time</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">System Uptime</h4>
                    <p className="text-2xl font-bold text-green-600">99.8%</p>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Data Accuracy</h4>
                    <p className="text-2xl font-bold text-green-600">96.5%</p>
                    <p className="text-xs text-muted-foreground">Advisory accuracy rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage farmer profiles and access permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Button>Add New User</Button>
                    <Button variant="outline">Bulk Import</Button>
                    <Button variant="outline">Export Data</Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-center text-muted-foreground">
                      User management interface would be implemented here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage knowledge base, advisories, and educational content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Button>Add New Guide</Button>
                    <Button variant="outline">Upload Video</Button>
                    <Button variant="outline">Update Prices</Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-center text-muted-foreground">
                      Content management interface would be implemented here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Detailed insights and usage analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-8">
                  <p className="text-center text-muted-foreground">
                    Analytics dashboard with charts and insights would be implemented here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system parameters and integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">AI Configuration</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        <span>Enable multilingual support</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        <span>Auto-generate advisories</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" />
                        <span>Advanced analytics tracking</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Integration Settings</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        <span>Weather API integration</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        <span>Market price feeds</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" />
                        <span>Government scheme API</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;