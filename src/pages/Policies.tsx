import { useState } from "react";
import { FileText, ExternalLink, Check, X, Calculator, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { useTranslation } from "react-i18next";

const Policies = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const policies = [
    {
      id: 1,
      name: t('policies.policies.pmKisan.name'),
      description: t('policies.policies.pmKisan.description'),
      category: "central",
      eligibility: t('policies.policies.pmKisan.eligibility', { returnObjects: true }),
      benefits: t('policies.policies.pmKisan.benefits'),
      applicationProcess: t('policies.policies.pmKisan.applicationProcess'),
      documents: t('policies.policies.pmKisan.documents', { returnObjects: true }),
      status: "active",
      link: "https://pmkisan.gov.in/",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      name: t('policies.policies.pmfby.name'),
      description: t('policies.policies.pmfby.description'),
      category: "central",
      eligibility: t('policies.policies.pmfby.eligibility', { returnObjects: true }),
      benefits: t('policies.policies.pmfby.benefits'),
      applicationProcess: t('policies.policies.pmfby.applicationProcess'),
      documents: t('policies.policies.pmfby.documents', { returnObjects: true }),
      status: "active",
      link: "https://pmfby.gov.in/",
      lastUpdated: "2024-01-12"
    },
    {
      id: 3,
      name: t('policies.policies.nabardKerala.name'),
      description: t('policies.policies.nabardKerala.description'),
      category: "financial",
      eligibility: t('policies.policies.nabardKerala.eligibility', { returnObjects: true }),
      benefits: t('policies.policies.nabardKerala.benefits'),
      applicationProcess: t('policies.policies.nabardKerala.applicationProcess'),
      documents: t('policies.policies.nabardKerala.documents', { returnObjects: true }),
      status: "active",
      link: "https://www.nabard.org/info-centre-state-focus-papers.aspx",
      lastUpdated: "2024-01-10"
    },
    {
      id: 4,
      name: t('policies.policies.worldBankKera.name'),
      description: t('policies.policies.worldBankKera.description'),
      category: "development",
      eligibility: t('policies.policies.worldBankKera.eligibility', { returnObjects: true }),
      benefits: t('policies.policies.worldBankKera.benefits'),
      applicationProcess: t('policies.policies.worldBankKera.applicationProcess'),
      documents: t('policies.policies.worldBankKera.documents', { returnObjects: true }),
      status: "active",
      link: "https://pib.gov.in/PressReleseDetail.aspx?PRID=2095133",
      lastUpdated: "2024-01-08"
    },
    {
      id: 5,
      name: t('policies.policies.keralaOrganic.name'),
      description: t('policies.policies.keralaOrganic.description'),
      category: "state",
      eligibility: t('policies.policies.keralaOrganic.eligibility', { returnObjects: true }),
      benefits: t('policies.policies.keralaOrganic.benefits'),
      applicationProcess: t('policies.policies.keralaOrganic.applicationProcess'),
      documents: t('policies.policies.keralaOrganic.documents', { returnObjects: true }),
      status: "active",
      link: "#",
      lastUpdated: "2024-01-05"
    },
    {
      id: 6,
      name: t('policies.policies.spiceDevelopment.name'),
      description: t('policies.policies.spiceDevelopment.description'),
      category: "commodity",
      eligibility: t('policies.policies.spiceDevelopment.eligibility', { returnObjects: true }),
      benefits: t('policies.policies.spiceDevelopment.benefits'),
      applicationProcess: t('policies.policies.spiceDevelopment.applicationProcess'),
      documents: t('policies.policies.spiceDevelopment.documents', { returnObjects: true }),
      status: "active",
      link: "#",
      lastUpdated: "2024-01-03"
    }
  ];

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || policy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const EligibilityChecker = ({ policy }: { policy: any }) => {
    const [answers, setAnswers] = useState<{[key: string]: boolean}>({});
    
    const checkEligibility = () => {
      // Simple eligibility logic - in real app, this would be more sophisticated
      const eligibleCount = Object.values(answers).filter(Boolean).length;
      return eligibleCount >= policy.eligibility.length * 0.6; // 60% criteria met
    };

    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-sm">{t('policies.quickEligibilityCheck')}</h4>
        {policy.eligibility.map((criteria: string, index: number) => (
          <div key={index} className="flex items-start justify-between p-3 border rounded-lg gap-3">
            <span className="text-sm text-responsive leading-relaxed flex-1 min-w-0">{criteria}</span>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                size="sm"
                variant={answers[index] === true ? "default" : "outline"}
                onClick={() => setAnswers({...answers, [index]: true})}
                className="h-8 w-8 p-0"
              >
                <Check className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant={answers[index] === false ? "destructive" : "outline"}
                onClick={() => setAnswers({...answers, [index]: false})}
                className="h-8 w-8 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        
        {Object.keys(answers).length === policy.eligibility.length && (
          <div className={`p-4 rounded-lg border ${
            checkEligibility() 
              ? "bg-green-50 border-green-200 text-green-800" 
              : "bg-red-50 border-red-200 text-red-800"
          }`}>
            <p className="font-semibold text-sm text-responsive">
              {checkEligibility() 
                ? t('policies.youAppearEligible')
                : t('policies.mayNotMeetCriteria')}
            </p>
            <p className="text-sm mt-1 text-responsive leading-relaxed">
              {checkEligibility() 
                ? t('policies.proceedWithApplication')
                : t('policies.verifyRequirements')}
            </p>
          </div>
        )}
      </div>
    );
  };

  const PolicyCard = ({ policy }: { policy: any }) => (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-2 text-responsive leading-tight">{policy.name}</CardTitle>
            <CardDescription className="mt-2 text-responsive leading-relaxed">{policy.description}</CardDescription>
          </div>
          <Badge 
            variant={
              policy.category === "central" ? "default" :
              policy.category === "state" ? "secondary" :
              policy.category === "financial" ? "outline" : "destructive"
            }
            className="flex-shrink-0 text-xs"
          >
            {policy.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div>
          <h4 className="font-semibold mb-2 text-sm">{t('policies.benefits')}</h4>
          <p className="text-sm text-muted-foreground text-responsive leading-relaxed">{policy.benefits}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm">{t('policies.applicationProcess')}</h4>
          <p className="text-sm text-muted-foreground text-responsive leading-relaxed">{policy.applicationProcess}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm">{t('policies.requiredDocuments')}</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {policy.documents.map((doc: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-responsive">
                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span className="leading-relaxed">{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <EligibilityChecker policy={policy} />
        </div>

        <div className="flex gap-2 pt-4 border-t flex-shrink-0">
          <Button className="flex-1 min-w-0" asChild>
            <a href={policy.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-responsive truncate">{t('policies.applyNow')}</span>
            </a>
          </Button>
          <Button variant="outline" className="flex-shrink-0">
            <Calculator className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center flex-shrink-0">
          {t('policies.lastUpdated')}: {new Date(policy.lastUpdated).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-header">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2 text-responsive leading-tight">{t('policies.title')}</h1>
            <p className="text-muted-foreground text-responsive leading-relaxed">{t('policies.subtitle')}</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 flex-shrink-0" />
              <Input
                placeholder={t('policies.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-responsive"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 flex-shrink-0">
                <Filter className="h-4 w-4 mr-2 flex-shrink-0" />
                <SelectValue placeholder={t('policies.filterByCategory')} className="text-responsive" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-responsive">{t('policies.allCategories')}</SelectItem>
                <SelectItem value="central" className="text-responsive">{t('policies.centralSchemes')}</SelectItem>
                <SelectItem value="state" className="text-responsive">{t('policies.stateSchemes')}</SelectItem>
                <SelectItem value="financial" className="text-responsive">{t('policies.financialSupport')}</SelectItem>
                <SelectItem value="commodity" className="text-responsive">{t('policies.commoditySpecific')}</SelectItem>
                <SelectItem value="development" className="text-responsive">{t('policies.developmentProjects')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="grid" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid" className="text-responsive">{t('policies.cardView')}</TabsTrigger>
              <TabsTrigger value="table" className="text-responsive">{t('policies.tableView')}</TabsTrigger>
            </TabsList>

            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPolicies.map((policy) => (
                  <PolicyCard key={policy.id} policy={policy} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table">
              <Card>
                <CardHeader>
                  <CardTitle className="text-responsive">{t('policies.policiesOverview')}</CardTitle>
                  <CardDescription className="text-responsive">{t('policies.quickReferenceTable')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold min-w-[200px]">{t('policies.schemeName')}</th>
                          <th className="text-left p-3 font-semibold min-w-[100px]">{t('policies.category')}</th>
                          <th className="text-left p-3 font-semibold min-w-[250px]">{t('policies.benefits')}</th>
                          <th className="text-left p-3 font-semibold min-w-[80px]">{t('policies.status')}</th>
                          <th className="text-left p-3 font-semibold min-w-[80px]">{t('policies.action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPolicies.map((policy) => (
                          <tr key={policy.id} className="border-b hover:bg-muted/50">
                            <td className="p-3 font-medium text-responsive leading-relaxed">
                              <div className="line-clamp-2">{policy.name}</div>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline" className="text-xs">
                                {policy.category}
                              </Badge>
                            </td>
                            <td className="p-3 text-muted-foreground text-responsive leading-relaxed">
                              <div className="line-clamp-3 max-w-[250px]">{policy.benefits}</div>
                            </td>
                            <td className="p-3">
                              <Badge variant="default" className="text-xs">
                                {t('policies.active')}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <Button size="sm" variant="outline" asChild className="h-8 w-8 p-0">
                                <a href={policy.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <Card className="text-center p-4">
              <h3 className="text-2xl font-bold text-primary">6</h3>
              <p className="text-sm text-muted-foreground text-responsive leading-relaxed">{t('policies.activeSchemes')}</p>
            </Card>
            <Card className="text-center p-4">
              <h3 className="text-2xl font-bold text-primary">₹2.79L Cr</h3>
              <p className="text-sm text-muted-foreground text-responsive leading-relaxed">{t('policies.nabardCredit')}</p>
            </Card>
            <Card className="text-center p-4">
              <h3 className="text-2xl font-bold text-primary">400K+</h3>
              <p className="text-sm text-muted-foreground text-responsive leading-relaxed">{t('policies.farmersInKera')}</p>
            </Card>
            <Card className="text-center p-4">
              <h3 className="text-2xl font-bold text-primary">51%</h3>
              <p className="text-sm text-muted-foreground text-responsive leading-relaxed">{t('policies.agricultureCreditShare')}</p>
            </Card>
          </div>

          {/* Important Links */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-responsive">{t('policies.importantResources')}</CardTitle>
              <CardDescription className="text-responsive">{t('policies.officialPortals')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-responsive">{t('policies.centralGovernmentPortals')}</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" 
                         className="text-primary hover:underline flex items-start gap-2 group">
                        <ExternalLink className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="text-responsive leading-relaxed group-hover:text-primary-dark">{t('policies.pmKisanPortal')}</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://pmfby.gov.in/" target="_blank" rel="noopener noreferrer" 
                         className="text-primary hover:underline flex items-start gap-2 group">
                        <ExternalLink className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="text-responsive leading-relaxed group-hover:text-primary-dark">{t('policies.cropInsurance')}</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.nabard.org/" target="_blank" rel="noopener noreferrer" 
                         className="text-primary hover:underline flex items-start gap-2 group">
                        <ExternalLink className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="text-responsive leading-relaxed group-hover:text-primary-dark">{t('policies.nabardWebsite')}</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-responsive">{t('policies.keralaStateResources')}</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-start gap-2 group">
                        <ExternalLink className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="text-responsive leading-relaxed group-hover:text-primary-dark">{t('policies.keralaAgricultureDept')}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-start gap-2 group">
                        <ExternalLink className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="text-responsive leading-relaxed group-hover:text-primary-dark">{t('policies.keralaRuralDevelopment')}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-start gap-2 group">
                        <ExternalLink className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="text-responsive leading-relaxed group-hover:text-primary-dark">{t('policies.spicesBoardKerala')}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Policies;