import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Bot, User, AlertTriangle } from 'lucide-react';

interface HeroComparisonProps {
  isLightMode?: boolean;
}

export const HeroComparison: React.FC<HeroComparisonProps> = ({ isLightMode }) => {
  const [value, setValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(30);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value));
  };

  return (
    <div className="relative w-full max-w-xl mx-auto py-12 perspective-1000">
      {/* Glow Behind */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full blur-[100px] -z-10 transition-colors duration-500 ${
        isLightMode ? 'bg-champagne-300/50' : 'bg-steelblue-500/20'
      }`}></div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative transform transition-transform duration-300 ease-out shadow-2xl rounded-3xl overflow-hidden border-2 ${
          isLightMode 
            ? 'bg-white/90 border-champagne-200 shadow-steelblue-200/50' 
            : 'bg-steelblue-900/90 border-steelblue-600 shadow-black/50'
        }`}
        style={{
          transform: `rotateX(${2 + tilt.x}deg) rotateY(${-2 + tilt.y}deg)`,
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Terminal Header */}
        <div className={`h-14 flex items-center px-6 justify-between shrink-0 select-none border-b ${
          isLightMode ? 'bg-champagne-50 border-champagne-200' : 'bg-steelblue-950/50 border-steelblue-700'
        }`}>
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-400"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-400"></div>
          </div>
          <div className={`text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 ${
            isLightMode ? 'text-steelblue-400' : 'text-steelblue-300'
          }`}>
            <Terminal className="h-4 w-4 text-champagne-500" />
            Legal_Engine_v3.0
          </div>
          <div className="w-10"></div>
        </div>

        {/* Terminal Body */}
        <div className={`p-8 font-mono text-sm min-h-[460px] flex flex-col relative select-none ${
          isLightMode ? 'bg-white' : 'bg-steelblue-900'
        }`}>
          
          {/* User Query */}
          <div className="flex gap-5 mb-8 animate-slide-up">
            <div className="mt-1 shrink-0">
               <div className={`p-2 rounded-xl ${isLightMode ? 'bg-champagne-100 text-steelblue-700' : 'bg-steelblue-800 text-champagne-300'}`}>
                 <User className="h-5 w-5" />
               </div>
            </div>
            <div className={`p-5 rounded-2xl rounded-tl-none border shadow-sm text-base leading-relaxed ${
               value < 20 
                 ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                 : isLightMode 
                    ? 'bg-champagne-50 text-steelblue-800 border-champagne-200' 
                    : 'bg-steelblue-800/50 text-steelblue-100 border-steelblue-700'
            }`}>
              {value < 30 
                ? "Police asking 5000rs bribe! Help!!" 
                : "Police officer stopped me without badge, demanding bribe and using abusive language."}
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-5 relative flex-1">
             <div 
                className="mt-1 shrink-0 transition-all duration-300" 
                style={{ 
                  opacity: value > 5 ? 1 : 0.2,
                  transform: `scale(${value > 5 ? 1 : 0.8})` 
                }}
             >
               <div className="p-2 rounded-xl bg-champagne-500 text-steelblue-900 shadow-lg shadow-champagne-500/30">
                 <Bot className="h-5 w-5" />
               </div>
             </div>
             
             <div className="w-full relative">
                <div 
                  className="overflow-hidden transition-all duration-300 ease-out border-l-2 pl-6"
                  style={{ 
                    maxHeight: `${value * 8}px`, 
                    opacity: Math.max(0.1, value / 20),
                    borderColor: isLightMode ? '#D4AF37' : '#4682B4'
                  }}
                >
                  <div className={`space-y-5 pb-2 w-full text-sm ${
                    isLightMode ? 'text-steelblue-700' : 'text-steelblue-200'
                  }`}>
                    <div>
                      <h3 className="text-champagne-600 dark:text-champagne-400 font-bold mb-1 flex items-center gap-2 uppercase tracking-wide text-xs">
                         01. Identification
                      </h3>
                      <p className="font-semibold text-lg">Police Harassment & Corruption</p>
                    </div>

                    <div>
                      <h3 className="text-champagne-600 dark:text-champagne-400 font-bold mb-1 uppercase tracking-wide text-xs">
                        02. Immediate Actions
                      </h3>
                      <ul className="space-y-1.5">
                         <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> 
                            <span>Do <strong className="text-red-500">NOT</strong> pay the bribe.</span>
                         </li>
                         <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-lightblue-400"></span> 
                            <span>Note name from badge (if visible).</span>
                         </li>
                         <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-lightblue-400"></span> 
                            <span>Record audio/video if safe.</span>
                         </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-champagne-600 dark:text-champagne-400 font-bold mb-2 uppercase tracking-wide text-xs">
                         03. Laws Applicable
                      </h3>
                      <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-steelblue-50 border-steelblue-100' : 'bg-steelblue-800/50 border-steelblue-700'}`}>
                          <p><strong className="text-champagne-600 dark:text-champagne-400">Section 7, PC Act:</strong> Demand of bribe is non-bailable (3-7 yrs jail).</p>
                      </div>
                    </div>
                    
                    <div>
                        <h3 className="text-champagne-600 dark:text-champagne-400 font-bold mb-1 uppercase tracking-wide text-xs">05. Recommended</h3>
                        <p>Dial <strong>1064</strong> (Anti-Corruption) immediately.</p>
                    </div>
                  </div>
                </div>

                {/* Overlay Hint */}
                <div 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-500 flex flex-col items-center justify-center"
                    style={{ opacity: value < 15 ? 1 : 0 }}
                >
                    <div className="text-xs text-steelblue-400 uppercase tracking-[0.2em] font-bold bg-black/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        Slide to Reveal Clarity
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Footer Control */}
        <div className={`h-24 flex items-center justify-center px-10 relative z-20 ${
          isLightMode ? 'bg-champagne-50 border-t border-champagne-200' : 'bg-steelblue-950 border-t border-steelblue-700'
        }`}>
           <div className="relative w-full group">
             <input
               type="range"
               min="0"
               max="100"
               value={value}
               onChange={handleSliderChange}
               className={`w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none ${
                 isLightMode ? 'bg-steelblue-100' : 'bg-steelblue-800'
               }`}
               style={{
                 backgroundImage: 'linear-gradient(to right, #4682B4, #D4AF37)',
                 backgroundSize: `${value}% 100%`,
                 backgroundRepeat: 'no-repeat'
               }}
             />
             <style>{`
               input[type=range]::-webkit-slider-thumb {
                 -webkit-appearance: none;
                 height: 24px;
                 width: 48px;
                 border-radius: 99px;
                 background: #D4AF37;
                 border: 2px solid white;
                 box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                 cursor: ew-resize;
                 transition: all 0.2s;
                 margin-top: -11px;
               }
               input[type=range]::-webkit-slider-thumb:hover {
                 transform: scale(1.1);
                 background: #F3E5AB;
               }
             `}</style>
           </div>
        </div>
      </div>
    </div>
  );
};