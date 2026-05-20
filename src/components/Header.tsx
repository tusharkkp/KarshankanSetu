import { useState, useEffect } from "react";
import { Menu, X, MessageCircle, User, BookOpen, Calendar, Bell, FileText, Home, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/auth/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();

  const navItems = [
    { name: t('navigation.home'), href: "/app/home", icon: Home },
    { name: t('navigation.profile'), href: "/app/profile", icon: User },
    { name: t('navigation.krishiSakhi'), href: "/app/sakhi", icon: MessageCircle },
    { name: t('navigation.diary'), href: "/app/activities", icon: Calendar },
    { name: t('navigation.advisories'), href: "/advisories", icon: Bell },
    { name: t('navigation.alerts'), href: "/app/alerts", icon: Bell },
    { name: t('navigation.knowledge'), href: "/knowledge", icon: BookOpen },
    { name: t('navigation.policies'), href: "/policies", icon: FileText },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <TooltipProvider>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 header-safe",
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg" 
          : "bg-white/90 backdrop-blur-md border-b border-gray-200/30 shadow-sm"
      )}>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="header-container h-16 lg:h-18 gap-2">
          {/* Logo */}
          <Link 
            to="/app/home" 
            className="header-logo flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-11 h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-extrabold text-lg lg:text-xl tracking-wide">KS</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
                  {t('common.karshakanSetu')}
                </span>
              </h1>
              <p className="text-xs text-gray-500 font-medium">{t('common.aiFarmingCompanion')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="header-nav hidden lg:flex items-center min-w-0 flex-1">
            <nav className="nav-container w-full">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "nav-item-responsive group",
                          isActive
                            ? "text-white bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"
                            : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                        )}
                      >
                        <span className="relative z-10 flex items-center space-x-2 min-w-0 nav-item">
                          {item.icon && <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />}
                          <span className="nav-item-text">{item.name}</span>
                        </span>
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </nav>
          </div>

          {/* Right side controls */}
          <div className="header-controls hidden lg:flex items-center gap-3 min-w-0 flex-shrink-0">
            <LanguageSwitcher />
            {/* Auth temporarily disabled */}
            <div className="welcome-text">
              {t('common.welcome')}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden relative w-10 h-10 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <Menu className={cn(
                "absolute inset-0 h-5 w-5 transition-all duration-300",
                isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              )} />
              <X className={cn(
                "absolute inset-0 h-5 w-5 transition-all duration-300",
                isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              )} />
            </div>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="py-4 border-t border-gray-200/50">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group",
                      isActive
                        ? "text-white bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"
                        : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="px-4 py-3">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
    </TooltipProvider>
  );
};

export default Header;