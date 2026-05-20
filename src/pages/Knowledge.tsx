import { useState } from "react";
import { Search, BookOpen, Video, FileText, Download, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const cropGuides = [
    {
      id: 1,
      title: "Complete Cardamom Cultivation Guide",
      description: "Comprehensive guide covering planting, care, harvesting, and post-harvest processing of cardamom in Kerala conditions.",
      type: "guide",
      crop: "Cardamom",
      language: "English",
      lastUpdated: "2024-01-15",
      downloads: 1250,
      views: 3400
    },
    {
      id: 2,
      title: "Black Pepper Integrated Pest Management",
      description: "IPM strategies for managing major pests and diseases affecting black pepper cultivation.",
      type: "guide",
      crop: "Black Pepper",
      language: "Malayalam",
      lastUpdated: "2024-01-10",
      downloads: 890,
      views: 2100
    },
    {
      id: 3,
      title: "Coffee Plantation Management - Wayanad Edition",
      description: "Specific techniques for coffee cultivation in Wayanad's unique microclimate and soil conditions.",
      type: "guide",
      crop: "Coffee",
      language: "English",
      lastUpdated: "2024-01-08",
      downloads: 670,
      views: 1800
    }
  ];

  const videos = [
    {
      id: 4,
      title: "Cardamom Harvesting Techniques",
      description: "Visual demonstration of proper cardamom harvesting methods for maximum yield and quality.",
      type: "video",
      crop: "Cardamom",
      language: "Malayalam",
      duration: "12:34",
      views: 5600,
      lastUpdated: "2024-01-12"
    },
    {
      id: 5,
      title: "Organic Fertilizer Preparation",
      description: "Step-by-step video guide for preparing organic fertilizers using locally available materials.",
      type: "video",
      crop: "All Crops",
      language: "English",
      duration: "18:45",
      views: 8900,
      lastUpdated: "2024-01-05"
    }
  ];

  const pestDatabase = [
    {
      id: 6,
      title: "Cardamom Thrips - Identification & Control",
      description: "Detailed information about cardamom thrips lifecycle, symptoms, and management strategies.",
      type: "pest",
      crop: "Cardamom",
      language: "English",
      severity: "High",
      lastUpdated: "2024-01-14",
      views: 2300
    },
    {
      id: 7,
      title: "Black Pepper Scale Insects",
      description: "Recognition and integrated management of scale insects affecting pepper vines.",
      type: "pest",
      crop: "Black Pepper",
      language: "Malayalam",
      severity: "Medium",
      lastUpdated: "2024-01-11",
      views: 1800
    }
  ];

  const bestPractices = [
    {
      id: 8,
      title: "Water Conservation Techniques for Spice Crops",
      description: "Proven methods for efficient water usage in cardamom, pepper, and coffee cultivation.",
      type: "practice",
      crop: "All Crops",
      language: "English",
      impact: "30% water savings",
      lastUpdated: "2024-01-09",
      views: 4200
    },
    {
      id: 9,
      title: "Soil Health Improvement Strategies",
      description: "Sustainable practices for enhancing soil fertility and structure in Kerala's laterite soils.",
      type: "practice",
      crop: "All Crops",
      language: "Malayalam",
      impact: "25% yield increase",
      lastUpdated: "2024-01-07",
      views: 3800
    }
  ];

  const allContent = [...cropGuides, ...videos, ...pestDatabase, ...bestPractices];

  const filteredContent = allContent.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "guide": return <BookOpen className="h-5 w-5" />;
      case "video": return <Video className="h-5 w-5" />;
      case "pest": return <FileText className="h-5 w-5" />;
      case "practice": return <FileText className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const ContentCard = ({ content }: { content: any }) => (
    <Card className="knowledge-card h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {getIcon(content.type)}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2">{content.title}</CardTitle>
              <CardDescription className="mt-1 line-clamp-2">{content.description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{content.crop}</Badge>
          <Badge variant="secondary">{content.language}</Badge>
          {content.type === "video" && (
            <Badge variant="outline">{content.duration}</Badge>
          )}
          {content.severity && (
            <Badge variant={content.severity === "High" ? "destructive" : "default"}>
              {content.severity}
            </Badge>
          )}
        </div>

        {content.impact && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm font-medium text-green-800">Impact: {content.impact}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {content.views}
            </span>
            {content.downloads && (
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                {content.downloads}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(content.lastUpdated).toLocaleDateString()}
          </span>
        </div>

        <div className="flex gap-2">
          <Button variant="default" size="sm" className="flex-1">
            {content.type === "video" ? "Watch" : "Read"}
          </Button>
          {content.type !== "video" && (
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-header">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Knowledge Hub</h1>
            <p className="text-muted-foreground">Comprehensive farming resources, guides, and best practices for Kerala's spice crops</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search guides, videos, pest info, best practices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="guides">Crop Guides</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="pests">Pest Database</TabsTrigger>
              <TabsTrigger value="practices">Best Practices</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cropGuides.filter(guide =>
                  guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  guide.crop.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.filter(video =>
                  video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  video.crop.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pests">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pestDatabase.filter(pest =>
                  pest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  pest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  pest.crop.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practices">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bestPractices.filter(practice =>
                  practice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  practice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  practice.crop.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Knowledge Updates */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Latest Updates from KVKs & Agricultural Universities</CardTitle>
              <CardDescription>Recent research findings and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">New IPM Protocol for Cardamom Pests</h4>
                  <p className="text-sm text-muted-foreground">Kerala Agricultural University releases updated integrated pest management guidelines for cardamom cultivation.</p>
                  <p className="text-xs text-muted-foreground mt-1">January 15, 2024 - KAU Research Station, Pampadumpara</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Organic Certification Support Program</h4>
                  <p className="text-sm text-muted-foreground">New initiative to support farmers in obtaining organic certification for spice crops with 75% subsidy.</p>
                  <p className="text-xs text-muted-foreground mt-1">January 12, 2024 - Kerala Spices Development Corporation</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Climate-Resilient Farming Techniques</h4>
                  <p className="text-sm text-muted-foreground">Workshop series on adapting farming practices to changing climate patterns in Western Ghats.</p>
                  <p className="text-xs text-muted-foreground mt-1">January 10, 2024 - ICAR-CTCRI, Thiruvananthapuram</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Knowledge;