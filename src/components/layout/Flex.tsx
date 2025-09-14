/**
 * Flex Component - Production-ready Flexbox System
 * 
 * @description
 * Flexible Flexbox component for one-dimensional layouts
 * Replaces Figma's manual positioning with semantic flex patterns
 * 
 * @features
 * - Responsive flex directions
 * - Consistent gap system
 * - Semantic justify/align options
 * - Mobile-first approach
 */

import React from 'react';
import { cn } from '../ui/utils';

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  wrap?: boolean;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    mobile?: Partial<Pick<FlexProps, 'direction' | 'justify' | 'align'>>;
    tablet?: Partial<Pick<FlexProps, 'direction' | 'justify' | 'align'>>;
    desktop?: Partial<Pick<FlexProps, 'direction' | 'justify' | 'align'>>;
  };
  className?: string;
}

const directionClasses = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse'
};

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
};

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline'
};

const gapClasses = {
  none: '',
  xs: 'gap-2',   // 8px
  sm: 'gap-4',   // 16px
  md: 'gap-6',   // 24px
  lg: 'gap-8',   // 32px
  xl: 'gap-12'   // 48px
};

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = false,
  gap = 'md',
  responsive,
  className
}) => {
  const getResponsiveClasses = () => {
    if (!responsive) return '';
    
    const classes = [];
    
    if (responsive.mobile) {
      const { direction: mDir, justify: mJust, align: mAlign } = responsive.mobile;
      if (mDir) classes.push(directionClasses[mDir]);
      if (mJust) classes.push(justifyClasses[mJust]);
      if (mAlign) classes.push(alignClasses[mAlign]);
    }
    
    if (responsive.tablet) {
      const { direction: tDir, justify: tJust, align: tAlign } = responsive.tablet;
      if (tDir) classes.push(`md:${directionClasses[tDir]}`);
      if (tJust) classes.push(`md:${justifyClasses[tJust]}`);
      if (tAlign) classes.push(`md:${alignClasses[tAlign]}`);
    }
    
    if (responsive.desktop) {
      const { direction: dDir, justify: dJust, align: dAlign } = responsive.desktop;
      if (dDir) classes.push(`lg:${directionClasses[dDir]}`);
      if (dJust) classes.push(`lg:${justifyClasses[dJust]}`);
      if (dAlign) classes.push(`lg:${alignClasses[dAlign]}`);
    }
    
    return classes.join(' ');
  };

  return (
    <div
      className={cn(
        'flex',
        !responsive && directionClasses[direction],
        !responsive && justifyClasses[justify],
        !responsive && alignClasses[align],
        wrap && 'flex-wrap',
        gapClasses[gap],
        getResponsiveClasses(),
        className
      )}
    >
      {children}
    </div>
  );
};
