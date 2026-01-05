import React from 'react';
import { Book, PlusCircle, BarChart2, Eye } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'JOURNAL' as ViewState, icon: Book, label: 'Journal' },
    { id: 'ADD' as ViewState, icon: PlusCircle, label: 'New Dream' },
    { id: 'REALITY_CHECK' as ViewState, icon: Eye, label: 'Reality Check' },
    { id: 'STATS' as ViewState, icon: BarChart2, label: 'Insights' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-night-800 border-t border-night-700 md:static md:w-64 md:h-screen md:border-r md:border-t-0 flex md:flex-col justify-between md:justify-start z-50">
      <div className="hidden md:flex items-center gap-3 p-6 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Eye className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-white">Dreamscape</span>
      </div>

      <div className="flex md:flex-col w-full justify-around md:justify-start md:px-4 md:gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`
              flex flex-col md:flex-row items-center md:gap-3 p-3 md:px-4 md:py-3 rounded-xl transition-all duration-200
              ${currentView === item.id 
                ? 'text-indigo-400 bg-night-900 md:bg-indigo-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-night-700/50'}
            `}
          >
            <item.icon className={`w-6 h-6 ${currentView === item.id ? 'md:text-indigo-400' : ''}`} />
            <span className="text-xs md:text-sm font-medium mt-1 md:mt-0">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};