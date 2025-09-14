/**
 * Layout Components Index - Production-ready Layout System
 * 
 * @description
 * Centralized exports for all layout components
 * Modern alternative to Figma's absolute positioning
 */

export { Container } from './Container';
export { Grid } from './Grid';
export { Flex } from './Flex';
export { Section } from './Section';

// Re-export types
export type { ResponsiveBreakpoints, LayoutSection, GridConfig, FlexConfig } from '../../types/layout';
export { BREAKPOINTS, CONTAINER_SIZES, SPACING_SCALE } from '../../types/layout';
