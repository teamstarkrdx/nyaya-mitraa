import React from 'react';
import { Scale, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isLightMode?: boolean;
  toggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLightMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      isLightMode 
        ? 'bg-champagne-100/80 border-champagne-200 backdrop-blur-xl' 
        : 'bg-steelblue-900/80 border-steelblue-700 backdrop-blur-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-16">
            {/* Logo Area */}
            <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
              <div className={`p-3 rounded-xl transition-colors ${
                isLightMode ? 'bg-steelblue-100 text-steelblue-700' : 'bg-champagne-500 text-steelblue-900'
              }`}>
                <Scale className="h-6 w-6" />
              </div>
              <span className={`font-heading font-bold text-2xl tracking-tight ${isLightMode ? 'text-steelblue-900' : 'text-white'}`}>
                Nyaya <span className="text-champagne-500 italic">Mitra</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-2">
                {['Features', 'How It Works', 'Verify', 'Legal Aid', 'Roadmap'].map((item) => {
                  const href = `#${item.toLowerCase().replace(/\s/g, '-')}`;
                  return (
                    <a 
                      key={item} 
                      href={href} 
                      className={`px-5 py-2.5 rounded-full text-sm font-heading font-semibold tracking-wide transition-all duration-300 ${
                        isLightMode 
                          ? 'text-steelblue-600 hover:text-steelblue-900 hover:bg-white/50' 
                          : 'text-steelblue-200 hover:text-champagne-300 hover:bg-white/5'
                      }`}
                    >
                      {item}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
             {/* Theme Toggle */}
             <button
               onClick={toggleTheme}
               className={`p-3 rounded-full transition-all border ${
                 isLightMode 
                   ? 'bg-white border-champagne-200 text-steelblue-600 hover:text-steelblue-900 hover:border-steelblue-300' 
                   : 'bg-steelblue-800 border-steelblue-700 text-champagne-200 hover:text-white hover:border-champagne-500/50'
               }`}
               title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
             >
               {isLightMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
             </button>

             <button 
                onClick={() => alert("Sign In functionality coming soon!")}
                className={`px-8 py-3 rounded-full text-sm font-heading font-bold tracking-wider transition-all border ${
                   isLightMode 
                     ? 'bg-steelblue-900 text-white hover:bg-steelblue-800 hover:shadow-lg' 
                     : 'bg-champagne-500 text-steelblue-900 hover:bg-champagne-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] border-transparent'
                }`}
             >
                Sign In
             </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
             <button
               onClick={toggleTheme}
               className={`p-2 rounded-full transition-colors ${isLightMode ? 'bg-champagne-200 text-steelblue-800' : 'bg-steelblue-800 text-champagne-300'}`}
             >
               {isLightMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
             </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-lg focus:outline-none transition-colors ${
                isLightMode ? 'text-steelblue-900 hover:bg-champagne-200' : 'text-white hover:bg-steelblue-800'
              }`}
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className={`lg:hidden border-b backdrop-blur-xl ${
          isLightMode ? 'bg-champagne-100/95 border-champagne-200' : 'bg-steelblue-900/95 border-steelblue-700'
        }`}>
          <div className="px-6 pt-4 pb-8 space-y-3">
             {['Features', 'How It Works', 'Verify', 'Legal Aid', 'Roadmap'].map((item) => {
                  const href = `#${item.toLowerCase().replace(/\s/g, '-')}`;
                  return (
                    <a 
                      key={item} 
                      href={href} 
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-4 rounded-xl text-lg font-heading font-medium border border-transparent ${
                        isLightMode 
                          ? 'text-steelblue-800 hover:bg-white hover:border-champagne-200' 
                          : 'text-champagne-100 hover:bg-steelblue-800 hover:border-steelblue-600'
                      }`}
                    >
                      {item}
                    </a>
                  )
             })}
          </div>
        </div>
      )}
    </nav>
  );
};