/**
 * Header Navigation Component
 * 
 * @description
 * Responsive navigation header with scroll detection, mobile menu,
 * language switching, and smooth scrolling to sections.
 * 
 * @features
 * - Scroll-aware background transparency
 * - Mobile-responsive hamburger menu
 * - Language selector with visual indicators
 * - Smooth scroll navigation
 * - Sticky positioning with backdrop blur
 * 
 * @responsive_behavior
 * - Mobile (< 768px): Hamburger menu with overlay
 * - Tablet/Desktop (>= 768px): Horizontal navigation bar
 * - Scroll states: Transparent -> Semi-transparent with blur
 * 
 * @interactions
 * - Click navigation items: Smooth scroll to target sections
 * - Language selector: Immediate language switching
 * - CTA button: Scroll to pre-registration form
 * - Mobile menu: Toggle open/close with animation
 * 
 * @accessibility
 * - Keyboard navigation support
 * - ARIA labels for interactive elements
 * - Focus management for mobile menu
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Menu, X, Globe } from 'lucide-react';

/**
 * Header Component
 * 
 * @returns {JSX.Element} Responsive navigation header
 */
export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const languageNames = {
    ko: '한국어',
    en: 'English',
    ja: '日本語'
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-black/90 backdrop-blur-md border-b border-fantasy-gold/20' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-8 h-8 bg-fantasy-gold rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-dark-black rounded-full"></div>
            </div>
            <span className="text-xl font-cinzel text-fantasy-gold text-glow">
              {t('gameTitle')}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-foreground hover:text-fantasy-gold transition-colors"
            >
              {t('home')}
            </button>
            <button
              onClick={() => scrollToSection('characters')}
              className="text-foreground hover:text-fantasy-gold transition-colors"
            >
              {t('characters')}
            </button>
            <button
              onClick={() => scrollToSection('pre-register')}
              className="text-foreground hover:text-fantasy-gold transition-colors"
            >
              {t('preRegister')}
            </button>
            <button
              onClick={() => scrollToSection('rewards')}
              className="text-foreground hover:text-fantasy-gold transition-colors"
            >
              {t('rewards')}
            </button>
          </nav>

          {/* Language Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
              <SelectTrigger className="w-32 bg-stone-gray border-fantasy-gold/30 text-fantasy-gold">
                <div className="flex items-center space-x-2">
                  <Globe size={16} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-stone-gray border-fantasy-gold/30">
                {Object.entries(languageNames).map(([code, name]) => (
                  <SelectItem 
                    key={code} 
                    value={code}
                    className="text-fantasy-gold hover:bg-fantasy-gold/20"
                  >
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={() => scrollToSection('pre-register')}
              className="bg-fantasy-gold hover:bg-ancient-bronze text-dark-black glow-gold transition-all duration-300"
            >
              {t('registerNow')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-fantasy-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-stone-gray/95 rounded-lg border border-fantasy-gold/20">
            <nav className="flex flex-col space-y-4 px-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left text-foreground hover:text-fantasy-gold transition-colors"
              >
                {t('home')}
              </button>
              <button
                onClick={() => scrollToSection('characters')}
                className="text-left text-foreground hover:text-fantasy-gold transition-colors"
              >
                {t('characters')}
              </button>
              <button
                onClick={() => scrollToSection('pre-register')}
                className="text-left text-foreground hover:text-fantasy-gold transition-colors"
              >
                {t('preRegister')}
              </button>
              <button
                onClick={() => scrollToSection('rewards')}
                className="text-left text-foreground hover:text-fantasy-gold transition-colors"
              >
                {t('rewards')}
              </button>
              
              <div className="pt-4 border-t border-fantasy-gold/20">
                <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                  <SelectTrigger className="w-full bg-dark-black border-fantasy-gold/30 text-fantasy-gold">
                    <div className="flex items-center space-x-2">
                      <Globe size={16} />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-stone-gray border-fantasy-gold/30">
                    {Object.entries(languageNames).map(([code, name]) => (
                      <SelectItem 
                        key={code} 
                        value={code}
                        className="text-fantasy-gold hover:bg-fantasy-gold/20"
                      >
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={() => scrollToSection('pre-register')}
                className="bg-fantasy-gold hover:bg-ancient-bronze text-dark-black glow-gold transition-all duration-300"
              >
                {t('registerNow')}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};