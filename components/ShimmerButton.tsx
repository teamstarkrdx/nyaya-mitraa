import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ShimmerButtonProps {
  onClick?: () => void;
  label: string;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex h-16 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-4 focus:ring-champagne-500/30 hover:scale-105 transition-transform duration-300 shadow-xl shadow-champagne-500/20"
    >
      {/* Rotating Border Gradient */}
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4682B4_0%,#D4AF37_50%,#4682B4_100%)]" />
      
      {/* Button Content */}
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-steelblue-900 px-10 py-1 text-sm font-bold text-champagne-100 backdrop-blur-3xl transition-colors group-hover:bg-steelblue-800">
        <span className="relative z-10 flex items-center gap-3 text-lg tracking-wide font-display">
          {label}
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-champagne-500" />
        </span>
        
        {/* Shimmer Overlay */}
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:animate-shimmer">
           <div className="relative h-full w-20 bg-champagne-200/20" />
        </div>
      </span>
    </button>
  );
};