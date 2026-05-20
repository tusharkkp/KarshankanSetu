import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ChatDemo from "@/components/ChatDemo";
import FarmDiary from "@/components/FarmDiary";
import ResearchStats from "@/components/ResearchStats";
import Contact from "@/components/Contact";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-header">
        <Hero />
        <Features />
        <ChatDemo />
        <FarmDiary />
        <ResearchStats />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="min-w-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold">K</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-responsive">{t('common.karshakanSetu')}</h3>
              </div>
              <p className="text-primary-foreground/80 text-xs sm:text-sm text-responsive">
                {t('footer.tagline')}
              </p>
            </div>
            
            <div className="min-w-0">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.features')}</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-primary-foreground/80">
                <li className="text-responsive">{t('footer.farmProfiling')}</li>
                <li className="text-responsive">{t('footer.aiChat')}</li>
                <li className="text-responsive">{t('footer.digitalDiary')}</li>
                <li className="text-responsive">{t('footer.smartAdvisories')}</li>
              </ul>
            </div>
            
            <div className="min-w-0">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.resources')}</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-primary-foreground/80">
                <li className="text-responsive">{t('footer.knowledgeHub')}</li>
                <li className="text-responsive">{t('footer.researchInsights')}</li>
                <li className="text-responsive">{t('footer.governmentSchemes')}</li>
                <li className="text-responsive">{t('footer.support')}</li>
              </ul>
            </div>
            
            <div className="min-w-0">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.partners')}</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-primary-foreground/80">
                <li className="text-responsive">{t('footer.keralaAgriculture')}</li>
                <li className="text-responsive">{t('footer.kudumbashree')}</li>
                <li className="text-responsive">{t('footer.icarKvk')}</li>
                <li className="text-responsive">{t('footer.worldBankKera')}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-primary-foreground/80 text-responsive">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;