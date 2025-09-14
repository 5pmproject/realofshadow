/**
 * Container Component - Production-ready Container System
 * 
 * @description
 * Responsive container that replaces fixed-width Figma layouts
 * with flexible, accessible container patterns
 * 
 * @features
 * - Responsive max-widths with proper gutters
 * - Semantic HTML structure
 * - Consistent spacing system
 * - Mobile-first design approach
 */

import React from 'react';
import { cn } from '../ui/utils';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article' | 'aside';
}

const containerSizes = {
  sm: 'max-w-3xl',      // 768px
  md: 'max-w-4xl',      // 896px  
  lg: 'max-w-6xl',      // 1152px
  xl: 'max-w-7xl',      // 1280px
  full: 'max-w-full'
};

const containerSpacing = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-24 md:py-32'
};

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  spacing = 'md',
  className,
  as: Component = 'div'
}) => {
  return (
    <Component
      className={cn(
        // Base container styles
        'mx-auto px-4 sm:px-6 lg:px-8',
        
        // Responsive max-width
        containerSizes[size],
        
        // Vertical spacing
        containerSpacing[spacing],
        
        // Custom classes
        className
      )}
    >
      {children}
    </Component>
  );
};
