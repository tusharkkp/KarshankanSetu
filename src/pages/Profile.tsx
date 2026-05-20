import { useState, useEffect } from "react";
import { MapPin, Edit, Save, User, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import FarmerDashboard from "@/components/FarmerDashboard";
import PersonalInfoTab from "@/components/forms/PersonalInfoTab";
import FarmerDetailsTab from "@/components/forms/FarmerDetailsTab";
import CropPortfolioTab from "@/components/forms/CropPortfolioTab";
import { useAuth } from "@/auth/AuthContext";
import { useFarmerProfile } from "@/hooks/useFarmerProfile";
import { updateFarmerProfile } from "@/services/farmerService";

// Single source of truth: Firestore → profile (hook) → formData → Save → Firestore. No localStorage.

const defaultFormData = {
  // Personal info
  name: "",
  phone: "",
  // Schemes
  schemes: "PM-KISAN, PMFBY",
  // Location
  state: "Kerala",
  district: "",
  village: "",
  // Farm
  landSize: "",
  landUnit: "acre",
  farmType: "",
  primaryCrop: "",
};

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { profile, setProfile, loading } = useFarmerProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  // ONLY initialize formData from profile when profile changes (from Firestore). Never from localStorage or defaults after profile exists.
  useEffect(() => {
    if (!profile) return;
    const p = profile as {
      name?: string;
      phone?: string;
      schemes?: string;
      location?: { state?: string; district?: string; village?: string };
      farm?: { landSize?: string; landUnit?: string; farmType?: string; primaryCrop?: string };
    };
    setFormData({
      name: p.name ?? "",
      phone: p.phone ?? "",
      schemes: p.schemes ?? "PM-KISAN, PMFBY",
      state: p.location?.state ?? "Kerala",
      district: p.location?.district ?? "",
      village: p.location?.village ?? "",
      landSize: p.farm?.landSize ?? "",
      landUnit: p.farm?.landUnit ?? "acre",
      farmType: p.farm?.farmType ?? "",
      primaryCrop: p.farm?.primaryCrop ?? "",
    });
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    const updatedData = {
      name: formData.name,
      phone: formData.phone,
      schemes: formData.schemes,
      location: {
        state: formData.state,
        district: formData.district,
        village: formData.village,
      },
      farm: {
        landSize: formData.landSize,
        landUnit: "acre",
        farmType: formData.farmType,
        primaryCrop: formData.primaryCrop,
      },
    };
    try {
      console.log("Saving to Firestore:", updatedData);
      await updateFarmerProfile(user.uid, updatedData);
      setProfile((prev) => (prev ? { ...prev, ...updatedData } : prev));
      setIsEditing(false);
    } catch {
      // keep UI intact; could show toast later
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-header flex items-center justify-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-header">
        {/* Remove global max-width so dashboard can expand */}
        <div className="mx-auto">
          <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold text-primary">{t('profile.title')}</h1>
              <p className="text-muted-foreground">{t('profile.subtitle')}</p>
            </div>
            <Button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="gap-2"
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              {isEditing ? t('profile.saveChanges') : t('profile.editProfile')}
            </Button>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">{t('profile.dashboard')}</TabsTrigger>
              <TabsTrigger value="personal">{t('profile.personalInfo')}</TabsTrigger>
              <TabsTrigger value="farm">{t('profile.farmDetails')}</TabsTrigger>
              <TabsTrigger value="crops">{t('profile.cropPortfolio')}</TabsTrigger>
              <TabsTrigger value="schemes">{t('profile.schemes')}</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <FarmerDashboard />
            </TabsContent>

            <TabsContent value="personal">
              <div className="max-w-3xl mx-auto">
                <PersonalInfoTab formData={formData} setFormData={setFormData} isEditing={isEditing} />
              </div>
            </TabsContent>

            <TabsContent value="farm">
              <div className="max-w-3xl mx-auto">
                <FarmerDetailsTab formData={formData} setFormData={setFormData} isEditing={isEditing} />
              </div>
            </TabsContent>

            <TabsContent value="crops">
              <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sprout className="h-5 w-5" />
                      {t('profile.cropPortfolioTitle')}
                    </CardTitle>
                    <CardDescription>
                      {t('profile.cropPortfolioDesc')}
                    </CardDescription>
                  </CardHeader>
                </div>
                <CropPortfolioTab formData={formData} setFormData={setFormData} isEditing={isEditing} />
              </div>
            </TabsContent>

            <TabsContent value="schemes">
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('profile.governmentSchemes')}</CardTitle>
                    <CardDescription>
                      {t('profile.schemesDesc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="schemes">{t('profile.enrolledSchemes')}</Label>
                      <Textarea
                        id="schemes"
                        value={formData.schemes}
                        disabled={!isEditing}
                        onChange={(e) => setFormData({...formData, schemes: e.target.value})}
                        placeholder={t('profile.enrolledSchemesPlaceholder')}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4 border-primary/20">
                        <h4 className="font-semibold text-primary mb-2">PM-KISAN</h4>
                        <p className="text-sm text-muted-foreground mb-2">{t('profile.status')}: {t('profile.active')}</p>
                        <p className="text-xs text-muted-foreground">{t('profile.annualBenefit')}</p>
                      </Card>
                      <Card className="p-4 border-primary/20">
                        <h4 className="font-semibold text-primary mb-2">PMFBY</h4>
                        <p className="text-sm text-muted-foreground mb-2">{t('profile.status')}: {t('profile.enrolled')}</p>
                        <p className="text-xs text-muted-foreground">{t('profile.cropInsuranceCoverage')}</p>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;