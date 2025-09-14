/**
 * Grid Component - Production-ready CSS Grid System
 * 
 * @description
 * Flexible CSS Grid component that replaces Figma's absolute positioning
 * with responsive, accessible grid layouts
 * 
 * @features
 * - Responsive column counts
 * - Consistent gap system
 * - Auto-fit and auto-fill options
 * - Mobile-first breakpoints
 */

import React from 'react';
import { cn } from '../ui/utils';

interface GridProps {
  children: React.ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  alignment?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
  autoFit?: boolean;
  minItemWidth?: string;
}

const gapSizes = {
  sm: 'gap-4',      // 16px
  md: 'gap-6',      // 24px
  lg: 'gap-8',      // 32px
  xl: 'gap-12'      // 48px
};

const alignmentClasses = {
  start: 'items-start',
  center: 'items-center', 
  end: 'items-end',
  stretch: 'items-stretch'
};

export const Grid: React.FC<GridProps> = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  alignment = 'stretch',
  className,
  autoFit = false,
  minItemWidth = '280px'
}) => {
  const getGridCols = () => {
    if (autoFit) {
      return `grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`;
    }
    
    const { mobile = 1, tablet = 2, desktop = 3 } = columns;
    return cn(
      `grid-cols-${mobile}`,
      tablet && `md:grid-cols-${tablet}`,
      desktop && `lg:grid-cols-${desktop}`
    );
  };

  return (
    <div
      className={cn(
        'grid',
        getGridCols(),
        gapSizes[gap],
        alignmentClasses[alignment],
        className
      )}
    >
      {children}
    </div>
  );
};
