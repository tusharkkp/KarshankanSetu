import { Button } from "@/components/ui/button";
import { MessageCircle, TrendingUp, Users, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/kerala-farm-hero.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const stats = [
    { icon: TrendingUp, label: t('hero.yieldBoost'), value: "15-30%" },
    { icon: Sprout, label: t('hero.costReduction'), value: "20-25%" },
    { icon: Users, label: t('hero.farmersHelped'), value: "400K+" },
  ];

  const handleAskKrishiSakhi = () => {
    navigate('/app/sakhi');
  };

  const handleStartFarmProfiling = () => {
    navigate('/app/profile');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-16 sm:py-20">
        <div className="max-w-3xl">
          {/* Main Heading */}
          <h1 className="hero-title">
            {t('hero.title')}
            <span className="block gradient-hero bg-clip-text text-transparent">
              {t('hero.companion')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12">
            <Button size="lg" className="btn-hero" onClick={handleAskKrishiSakhi}>
              <MessageCircle className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-responsive">{t('hero.askKrishiSakhi')}</span>
            </Button>
            <Button size="lg" variant="outline" className="btn-secondary-hero" onClick={handleStartFarmProfiling}>
              <span className="text-responsive">{t('hero.startFarmProfiling')}</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stats-item">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg sm:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-white/80 text-responsive">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;