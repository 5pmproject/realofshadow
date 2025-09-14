/**
 * Main Application Component - Realm of Shadows MMORPG Pre-registration Page
 * 
 * @description
 * This is the main application component that orchestrates the entire pre-registration
 * landing page for the dark fantasy MMORPG "Realm of Shadows". It implements a 
 * multi-language, responsive design with interactive animations and form handling.
 * 
 * @features
 * - Multi-language support (Korean, English, Japanese)
 * - Responsive design (mobile-first approach)
 * - Dark fantasy theme with particle animations
 * - Interactive character selection
 * - Form validation and submission
 * - Real-time rewards tracking
 * - Accessibility compliance (WCAG 2.1)
 * 
 * @responsive_behavior
 * - Mobile: Single column layout with collapsible navigation
 * - Tablet: Adaptive grid layouts with optimized spacing
 * - Desktop: Full multi-column layouts with enhanced interactions
 * 
 * @design_system
 * Uses standardized design tokens for:
 * - Colors: Dark fantasy palette (gold, bronze, red, black)
 * - Typography: Cinzel (headings) + Inter (body text)
 * - Spacing: Consistent spacing scale from 4px to 96px
 * - Components: Reusable ShadCN UI components
 */

import React from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { ArtisticBackground } from './components/ArtisticBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ArtisticDivider } from './components/ArtisticDivider';
import { GameIntroSection } from './components/GameIntroSection';
import { CharacterSection } from './components/CharacterSection';
import { PreRegistrationForm } from './components/PreRegistrationForm';
import { RewardsSection } from './components/RewardsSection';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

/**
 * App Component
 * 
 * @returns {JSX.Element} The complete application layout
 */
export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground relative">
        {/* Artistic Particle Background */}
        <ArtisticBackground />
        
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Section Divider */}
          <ArtisticDivider />

          {/* Game Introduction */}
          <GameIntroSection />

          {/* Section Divider */}
          <ArtisticDivider />

          {/* Characters Section */}
          <CharacterSection />

          {/* Section Divider */}
          <ArtisticDivider />

          {/* Pre-Registration Form */}
          <PreRegistrationForm />

          {/* Section Divider */}
          <ArtisticDivider />

          {/* Rewards Section */}
          <RewardsSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--stone-gray)',
              color: 'var(--fantasy-gold)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
            },
          }}
        />
      </div>
    </LanguageProvider>
  );
}