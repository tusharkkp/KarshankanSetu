import { Card } from "@/components/ui/card";
import { 
  User, 
  MessageCircle, 
  Calendar, 
  Brain, 
  Bell, 
  BookOpen,
  MapPin,
  Camera,
  TrendingUp,
  Shield,
  Smartphone,
  Zap
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: User,
      title: t('features.farmerProfiling.title'),
      description: t('features.farmerProfiling.description'),
      benefits: t('features.farmerProfiling.benefits', { returnObjects: true }),
      color: "from-primary to-primary-light"
    },
    {
      icon: MessageCircle,
      title: t('features.conversationalInterface.title'),
      description: t('features.conversationalInterface.description'),
      benefits: t('features.conversationalInterface.benefits', { returnObjects: true }),
      color: "from-cardamom to-primary-glow"
    },
    {
      icon: Calendar,
      title: t('features.digitalDiary.title'),
      description: t('features.digitalDiary.description'),
      benefits: t('features.digitalDiary.benefits', { returnObjects: true }),
      color: "from-spice-gold to-secondary-rich"
    },
    {
      icon: Brain,
      title: t('features.aiAdvisory.title'),
      description: t('features.aiAdvisory.description'),
      benefits: t('features.aiAdvisory.benefits', { returnObjects: true }),
      color: "from-primary-light to-cardamom"
    },
    {
      icon: Bell,
      title: t('features.smartAlerts.title'),
      description: t('features.smartAlerts.description'),
      benefits: t('features.smartAlerts.benefits', { returnObjects: true }),
      color: "from-secondary-rich to-spice-gold"
    },
    {
      icon: BookOpen,
      title: t('features.knowledgeHub.title'),
      description: t('features.knowledgeHub.description'),
      benefits: t('features.knowledgeHub.benefits', { returnObjects: true }),
      color: "from-primary to-rubber"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title">
            {t('features.title')}
            <span className="block text-primary">{t('features.subtitle')}</span>
          </h2>
          <p className="section-subtitle">
            {t('features.description')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card group hover:scale-[1.02] transition-all duration-300">
              <div className={`feature-card-icon bg-gradient-to-br ${feature.color}`}>
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              
              <div className="feature-card-content">
                <h3 className="feature-card-title">
                  {feature.title}
                </h3>
                
                <p className="feature-card-description">
                  {feature.description}
                </p>
                
                <ul className="feature-card-benefits">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-xs sm:text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 sm:mr-3 mt-1.5 flex-shrink-0"></div>
                      <span className="text-responsive">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Technology Highlights */}
        <div className="mt-12 sm:mt-16 tech-highlights">
          {[
            { icon: Smartphone, label: t('features.techHighlights.mobileFirst') },
            { icon: Zap, label: t('features.techHighlights.offlinePWA') },
            { icon: Shield, label: t('features.techHighlights.secure') },
            { icon: TrendingUp, label: t('features.techHighlights.dataDriven') }
          ].map((item, index) => (
            <div key={index} className="tech-item">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
              </div>
              <p className="tech-item-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;