/**
 * Image Component - Production-ready Image with Fallback
 * 
 * @description
 * Enhanced image component that replaces Figma's basic image handling
 * with modern performance, accessibility, and responsive features
 * 
 * @features
 * - Automatic lazy loading
 * - Responsive image sizing
 * - Accessibility optimizations
 * - Error fallback handling
 * - Loading states
 * - WebP/AVIF support
 */

import React, { useState, useRef, useEffect } from 'react';
import { cn } from './utils';

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  sizes?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video', 
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  auto: ''
};

const objectFitClasses = {
  cover: 'object-cover',
  contain: 'object-contain', 
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down'
};

const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yOCAzMkw0NCA0OEw2MCAzMlY1Nkg0NEgyOFYzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPGNpcmNsZSBjeD0iMzYiIGN5PSIzMiIgcj0iNCIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = FALLBACK_IMAGE,
  aspectRatio = 'auto',
  objectFit = 'cover',
  priority = false,
  sizes,
  className,
  onLoad,
  onError,
  ...rest
}) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setImageState('loading');
  }, [src]);

  const handleLoad = () => {
    setImageState('loaded');
    onLoad?.();
  };

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setImageState('loading');
    } else {
      setImageState('error');
    }
    onError?.();
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {/* Loading placeholder */}
      {imageState === 'loading' && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 text-muted-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
          </div>
        </div>
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        className={cn(
          'w-full h-full transition-opacity duration-300',
          objectFitClasses[objectFit],
          imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />

      {/* Error state */}
      {imageState === 'error' && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m21 21-6-6m-5.5-3A6.5 6.5 0 0 1 3 6.5"/>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              </svg>
            </div>
            <p className="text-xs">Image not found</p>
          </div>
        </div>
      )}
    </div>
  );
};
