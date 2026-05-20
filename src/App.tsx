import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useTranslation } from "react-i18next";
import "@/i18n";
import LandingPage from "./pages/LandingPage";
import FarmerHome from "./pages/FarmerHome";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Diary from "./pages/Diary";
import Advisories from "./pages/Advisories";
import Alerts from "./pages/Alerts";
import Knowledge from "./pages/Knowledge";
import Policies from "./pages/Policies";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ContextGraphBridge } from "@/context/ContextGraphBridge";

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
  
  return (
    <div lang={i18n.language} dir={i18n.language === 'ar' || i18n.language === 'he' || i18n.language === 'fa' ? 'rtl' : 'ltr'}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <ContextGraphBridge />
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/app/home" element={<ProtectedRoute><FarmerHome /></ProtectedRoute>} />
                  <Route path="/app/sakhi" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                  <Route path="/app/activities" element={<ProtectedRoute><Diary /></ProtectedRoute>} />
                  <Route path="/app/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
                  <Route path="/app/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/advisories" element={<ProtectedRoute><Advisories /></ProtectedRoute>} />
                  <Route path="/knowledge" element={<ProtectedRoute><Knowledge /></ProtectedRoute>} />
                  <Route path="/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
