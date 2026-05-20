import { Card } from "@/components/ui/card";
import { TrendingUp, Target, Users, Leaf, DollarSign, Droplets, Shield, Award } from "lucide-react";

const ResearchStats = () => {
  const impactStats = [
    {
      icon: TrendingUp,
      title: "Yield Improvement",
      value: "15-30%",
      description: "Average increase in crop productivity",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: DollarSign,
      title: "Cost Reduction",
      value: "20-25%",
      description: "Savings on input costs and resources",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Target,
      title: "Fertilizer Efficiency",
      value: "20%",
      description: "Improved nutrient management",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      value: "30%",
      description: "Optimized irrigation practices",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "Crop Loss Prevention",
      value: "30-61%",
      description: "Reduced losses via climate services",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Users,
      title: "Women Farmers",
      value: "400K+",
      description: "Empowered through Kudumbashree",
      color: "from-pink-500 to-rose-600"
    }
  ];

  const technologies = [
    {
      name: "Malayalam NLP",
      description: "BERT/GPT with dialect normalization for local language support",
      progress: 85
    },
    {
      name: "Computer Vision",
      description: "Pest and disease identification using advanced ML models",
      progress: 90
    },
    {
      name: "Weather Integration",
      description: "Real-time weather APIs for precise farming advisories",
      progress: 95
    },
    {
      name: "Blockchain Security",
      description: "Secure data management and transaction verification",
      progress: 75
    }
  ];

  const comparisons = [
    {
      platform: "Karshakan Setu",
      features: ["Malayalam Support", "Spice Focus", "Local Context", "AI Advisory"],
      score: 95
    },
    {
      platform: "Plantix",
      features: ["90% Diagnostics", "No Malayalam", "Global Focus", "Pest ID"],
      score: 70
    },
    {
      platform: "DeHaat",
      features: ["15-20% Gains", "North/East Focus", "Supply Chain", "Market Access"],
      score: 65
    },
    {
      platform: "KAU Extension",
      features: ["Local Crops", "Expert Knowledge", "No AI", "Traditional"],
      score: 60
    }
  ];

  return (
    <section id="research" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Research-Backed
            <span className="block text-primary">Impact & Innovation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive analysis from 77+ research sources showcasing proven socio-economic 
            benefits, technological feasibility, and competitive advantages.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Proven Socio-Economic Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactStats.map((stat, index) => (
              <Card key={index} className="stats-card">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="font-semibold text-foreground mb-2">{stat.title}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Readiness */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Technology Readiness</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="feature-card">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-foreground">{tech.name}</h4>
                  <span className="text-sm font-medium text-primary">{tech.progress}%</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{tech.description}</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
                    style={{ width: `${tech.progress}%` }}
                  ></div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Competitive Analysis */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Competitive Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comparisons.map((platform, index) => (
              <Card key={index} className={`feature-card ${index === 0 ? 'border-primary/50 bg-primary/5' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">{platform.platform}</h4>
                  {index === 0 && <Award className="h-5 w-5 text-primary" />}
                </div>
                <ul className="space-y-2 mb-4">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Score</span>
                    <span className="text-sm font-bold text-primary">{platform.score}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === 0 ? 'bg-gradient-to-r from-primary to-primary-light' : 'bg-muted-foreground'
                      }`}
                      style={{ width: `${platform.score}%` }}
                    ></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Research Note */}
        <div className="mt-12 text-center">
          <Card className="feature-card max-w-2xl mx-auto">
            <Leaf className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Research Foundation</h4>
            <p className="text-muted-foreground">
              Based on comprehensive analysis of 77+ research sources (as of Sept 2025), 
              including socio-economic studies, technological assessments, and comparative 
              platform analysis specific to Kerala's agricultural ecosystem.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResearchStats;