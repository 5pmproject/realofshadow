/**
 * Section Component - Production-ready Section Wrapper
 * 
 * @description
 * Semantic section wrapper that provides consistent spacing,
 * background options, and accessibility features
 * 
 * @features
 * - Semantic HTML5 sections
 * - Consistent vertical rhythm
 * - Background variants
 * - ARIA landmarks support
 */

import React from 'react';
import { cn } from '../ui/utils';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  variant?: 'default' | 'hero' | 'feature' | 'testimonial' | 'cta';
  background?: 'transparent' | 'dark' | 'gradient' | 'image';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

const variantClasses = {
  default: '',
  hero: 'min-h-screen flex items-center justify-center',
  feature: 'relative',
  testimonial: 'relative',
  cta: 'relative text-center'
};

const backgroundClasses = {
  transparent: 'bg-transparent',
  dark: 'bg-stone-gray/90',
  gradient: 'bg-gradient-to-b from-dark-black/60 via-transparent to-dark-black/80',
  image: 'relative'
};

const spacingClasses = {
  none: 'py-0',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16', 
  lg: 'py-16 md:py-24',
  xl: 'py-24 md:py-32'
};

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  variant = 'default',
  background = 'transparent',
  spacing = 'lg',
  containerSize = 'lg',
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}) => {
  const isHero = variant === 'hero';
  
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'relative overflow-hidden',
        variantClasses[variant],
        backgroundClasses[background],
        !isHero && spacingClasses[spacing],
        className
      )}
    >
      {isHero ? (
        children
      ) : (
        <Container size={containerSize} spacing="none">
          {children}
        </Container>
      )}
    </section>
  );
};
