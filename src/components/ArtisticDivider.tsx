import React from 'react';

interface ArtisticDividerProps {
  className?: string;
}

export const ArtisticDivider: React.FC<ArtisticDividerProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="flex items-center space-x-4">
        {/* Left ornament */}
        <div className="w-12 h-8 relative">
          <svg viewBox="0 0 48 32" className="w-full h-full fill-current text-fantasy-gold">
            <path d="M0 16L12 8L24 16L12 24L0 16Z" opacity="0.8" />
            <path d="M12 16L24 8L36 16L24 24L12 16Z" opacity="0.6" />
            <path d="M24 16L36 8L48 16L36 24L24 16Z" opacity="0.4" />
          </svg>
        </div>

        {/* Center diamond */}
        <div className="relative">
          <div className="w-4 h-4 bg-fantasy-gold transform rotate-45 glow-gold"></div>
          <div className="absolute inset-0 w-4 h-4 bg-ancient-bronze transform rotate-45 opacity-50"></div>
        </div>

        {/* Center line */}
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-fantasy-gold to-transparent"></div>

        {/* Center diamond */}
        <div className="relative">
          <div className="w-4 h-4 bg-fantasy-gold transform rotate-45 glow-gold"></div>
          <div className="absolute inset-0 w-4 h-4 bg-ancient-bronze transform rotate-45 opacity-50"></div>
        </div>

        {/* Right ornament */}
        <div className="w-12 h-8 relative transform rotate-180">
          <svg viewBox="0 0 48 32" className="w-full h-full fill-current text-fantasy-gold">
            <path d="M0 16L12 8L24 16L12 24L0 16Z" opacity="0.8" />
            <path d="M12 16L24 8L36 16L24 24L12 16Z" opacity="0.6" />
            <path d="M24 16L36 8L48 16L36 24L24 16Z" opacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  );
};