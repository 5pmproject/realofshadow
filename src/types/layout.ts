/**
 * Layout System Types - Production-ready Layout Definitions
 * 
 * @description
 * Type definitions for consistent, scalable layout system
 * that replaces Figma's absolute positioning with modern CSS Grid/Flexbox
 */

export interface ResponsiveBreakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}

export interface LayoutSection {
  id: string;
  variant: 'hero' | 'content' | 'feature' | 'testimonial' | 'cta';
  spacing: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'dark' | 'gradient' | 'image';
}

export interface GridConfig {
  columns: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  alignment: 'start' | 'center' | 'end' | 'stretch';
}

export interface FlexConfig {
  direction: 'row' | 'column';
  justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align: 'start' | 'center' | 'end' | 'stretch';
  wrap: boolean;
  gap: string;
}

export const BREAKPOINTS: ResponsiveBreakpoints = {
  mobile: '320px',
  tablet: '768px', 
  desktop: '1024px',
  wide: '1440px'
};

export const CONTAINER_SIZES = {
  mobile: '100%',
  tablet: '100%',
  desktop: '1200px',
  wide: '1400px'
} as const;

export const SPACING_SCALE = {
  none: '0',
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '2rem',      // 32px
  lg: '4rem',      // 64px
  xl: '6rem',      // 96px
  '2xl': '8rem',   // 128px
  '3xl': '12rem'   // 192px
} as const;
