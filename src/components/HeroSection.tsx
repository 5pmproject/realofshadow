/**
 * Hero Section Component - Main Landing Area
 * 
 * @description
 * Full-screen hero section with animated background, typewriter text effect,
 * and call-to-action. Creates immersive first impression for visitors.
 * 
 * @features
 * - Typewriter animation for dynamic text display
 * - Background image with overlay gradients
 * - Animated scroll indicator
 * - Decorative floating elements
 * - Multi-language content cycling
 * 
 * @responsive_behavior
 * - Mobile: Single column, smaller text sizes, adjusted spacing
 * - Tablet: Medium text sizes, balanced layout
 * - Desktop: Large text, full decorative elements
 * 
 * @animations
 * - Typewriter effect: 50ms character interval, 2s pause between texts
 * - Scroll indicator: Bounce animation with pulse effect
 * - Decorative elements: Delayed pulse animations
 * - CTA button: Scale transform on hover
 * 
 * @performance
 * - Optimized image loading with fallback
 * - Efficient animation cleanup
 * - Minimal re-renders during typing animation
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

/**
 * Hero Section Component
 * 
 * @returns {JSX.Element} Full-screen hero section with animations
 */
export const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const heroTexts = [
    t('heroSubtitle'),
    t('heroDescription')
  ];

  useEffect(() => {
    if (currentTextIndex >= heroTexts.length) return;
    
    const currentText = heroTexts[currentTextIndex];
    if (displayedText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentTextIndex(prev => prev + 1);
        setDisplayedText('');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, currentTextIndex, heroTexts]);

  const scrollToPreRegister = () => {
    const element = document.getElementById('pre-register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1683660108133-b173c2b4281b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFudGFzeSUyMGNhc3RsZSUyMHNoYWRvd3MlMjBtZWRpZXZhbHxlbnwxfHx8fDE3NTc4MTk0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Dark Fantasy Castle"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-black/60 via-transparent to-dark-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-cinzel mb-6 text-fantasy-gold text-glow">
          {t('gameTitle')}
        </h1>

        {/* Animated Subtitle */}
        <div className="h-24 md:h-32 flex items-center justify-center mb-8">
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed">
            {currentTextIndex < heroTexts.length ? (
              <span className="inline-block min-h-[1.5em]">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            ) : (
              <span className="animate-fade-in">
                {t('heroDescription')}
              </span>
            )}
          </p>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Button
            onClick={scrollToPreRegister}
            size="lg"
            className="text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 bg-fantasy-gold hover:bg-ancient-bronze text-dark-black glow-gold transition-all duration-300 transform hover:scale-105"
          >
            {t('registerNow')}
          </Button>
          
          {/* Additional info */}
          <p className="text-sm md:text-base text-muted-foreground">
            {currentTextIndex >= heroTexts.length && (
              <span className="animate-fade-in">
                {language === 'ko' ? '지금 가입하고 독점 혜택을 받아보세요' : 
                 language === 'ja' ? '今すぐ登録して限定特典を手に入れよう' :
                 'Register now and get exclusive benefits'}
              </span>
            )}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-fantasy-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-fantasy-gold rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-4 md:left-12 opacity-30">
        <div className="w-16 h-16 border-2 border-fantasy-gold rounded-full animate-pulse"></div>
      </div>
      <div className="absolute bottom-1/4 right-4 md:right-12 opacity-30">
        <div className="w-12 h-12 border-2 border-ancient-bronze rounded-full animate-pulse delay-1000"></div>
      </div>
      

    </section>
  );
};