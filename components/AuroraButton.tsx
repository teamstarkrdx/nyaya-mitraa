import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AuroraButtonProps {
  onClick?: () => void;
  label: string;
}

export const AuroraButton: React.FC<AuroraButtonProps> = ({ onClick, label }) => {
  return (
    <button 
      onClick={onClick}
      className="group relative px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,229,255,0.3)] overflow-hidden bg-slate-900 border border-white/10 isolate"
    >
      {/* Background Gradients for Aurora Effect */}
      <div className="absolute inset-0 -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-spin-slow opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 blur-xl opacity-80 animate-aurora mix-blend-screen"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-50"></div>
      </div>
      
      {/* Liquid Wave Overlay */}
      <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
        {label} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </span>
      
      <style>{`
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-aurora {
          background-size: 200% 200%;
          animation: aurora 3s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};