import React from 'react';
import { Dream } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { MOODS } from '../constants';

interface StatsProps {
  dreams: Dream[];
}

export const Stats: React.FC<StatsProps> = ({ dreams }) => {
  // Process data for charts
  const moodCounts = MOODS.map(m => ({
    name: m.label,
    value: dreams.filter(d => d.mood === m.label).length,
    color: m.color.replace('text-', 'bg-').replace('-400', '-500').replace('-300', '-400') // Very rough mapping for tailwind classes to hex usually done differently but keeping simple
  }));

  // Helper to map tailwind colors to hex for Recharts
  const getColor = (mood: string) => {
    switch(mood) {
      case 'Happy': return '#4ade80';
      case 'Peaceful': return '#93c5fd';
      case 'Excited': return '#facc15';
      case 'Neutral': return '#94a3b8';
      case 'Confused': return '#c084fc';
      case 'Scared': return '#f87171';
      default: return '#cbd5e1';
    }
  };

  const lucidityData = [
    { name: 'None', count: dreams.filter(d => d.lucidity === 'None').length },
    { name: 'Low', count: dreams.filter(d => d.lucidity === 'Low').length },
    { name: 'Medium', count: dreams.filter(d => d.lucidity === 'Medium').length },
    { name: 'High', count: dreams.filter(d => d.lucidity === 'High').length },
    { name: 'Fully Lucid', count: dreams.filter(d => d.lucidity === 'Fully Lucid').length },
  ];

  if (dreams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <p className="text-lg">No dreams recorded yet.</p>
        <p className="text-sm">Start journaling to see your insights!</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6">Dream Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mood Distribution */}
        <div className="bg-night-800 p-6 rounded-xl border border-night-700 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-200 mb-6">Mood Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodCounts.filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {moodCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {moodCounts.filter(d => d.value > 0).map(m => (
              <div key={m.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getColor(m.name) }} />
                <span className="text-xs text-slate-400">{m.name} ({m.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lucidity Chart */}
        <div className="bg-night-800 p-6 rounded-xl border border-night-700 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-200 mb-6">Lucidity Levels</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lucidityData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#334155', opacity: 0.2}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-night-800 p-4 rounded-xl border border-night-700 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Dreams</p>
          <p className="text-3xl font-bold text-white">{dreams.length}</p>
        </div>
        <div className="bg-night-800 p-4 rounded-xl border border-night-700 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Lucid</p>
          <p className="text-3xl font-bold text-indigo-400">
            {dreams.filter(d => d.lucidity === 'High' || d.lucidity === 'Fully Lucid').length}
          </p>
        </div>
        <div className="bg-night-800 p-4 rounded-xl border border-night-700 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Most Common Mood</p>
          <p className="text-xl font-bold text-white truncate">
             {dreams.length > 0 ? moodCounts.sort((a,b) => b.value - a.value)[0].name : '-'}
          </p>
        </div>
         <div className="bg-night-800 p-4 rounded-xl border border-night-700 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Interpreted</p>
          <p className="text-3xl font-bold text-purple-400">
            {dreams.filter(d => !!d.interpretation).length}
          </p>
        </div>
      </div>
    </div>
  );
};