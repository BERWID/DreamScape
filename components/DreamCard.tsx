import React from 'react';
import { Dream } from '../types';
import { MOODS } from '../constants';
import { Calendar, Trash2, Edit2, Sparkles } from 'lucide-react';

interface DreamCardProps {
  dream: Dream;
  onEdit: (dream: Dream) => void;
  onDelete: (id: string) => void;
}

export const DreamCard: React.FC<DreamCardProps> = ({ dream, onEdit, onDelete }) => {
  const moodData = MOODS.find(m => m.label === dream.mood) || MOODS[3];
  const MoodIcon = moodData.icon;

  return (
    <div className="bg-night-800 border border-night-700 rounded-xl p-5 hover:border-indigo-500/50 transition-all duration-300 shadow-lg shadow-black/20 group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className={`${moodData.color} bg-white/5 p-1.5 rounded-lg`}>
            <MoodIcon className="w-5 h-5" />
          </span>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider px-2 py-1 rounded-full bg-night-900">
            {dream.lucidity} Lucidity
          </span>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(dream); }}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-night-700 rounded-lg"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(dream.id); }}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-night-700 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-slate-100 mb-2 line-clamp-1">{dream.title}</h3>
      
      <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
        {dream.content}
      </p>

      {dream.interpretation && (
        <div className="mb-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-indigo-300 mb-1">
            <Sparkles className="w-3 h-3" />
            <span className="text-xs font-bold uppercase">AI Interpretation</span>
          </div>
          <p className="text-slate-300 text-xs line-clamp-2 italic">
            {dream.interpretation.replace(/[#*]/g, '')}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-night-700/50">
        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(dream.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        
        <div className="flex gap-1.5">
          {dream.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs text-slate-500 bg-night-900 px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};