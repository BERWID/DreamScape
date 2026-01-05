import React, { useState, useEffect } from 'react';
import { Dream, Mood, LucidityLevel } from '../types';
import { MOODS, LUCIDITY_LEVELS } from '../constants';
import { interpretDream } from '../services/geminiService';
import { Sparkles, Save, X, ArrowLeft, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface DreamEditorProps {
  initialDream?: Dream;
  onSave: (dream: Dream) => void;
  onCancel: () => void;
}

export const DreamEditor: React.FC<DreamEditorProps> = ({ initialDream, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialDream?.title || '');
  const [content, setContent] = useState(initialDream?.content || '');
  const [mood, setMood] = useState<Mood>(initialDream?.mood || 'Neutral');
  const [lucidity, setLucidity] = useState<LucidityLevel>(initialDream?.lucidity || 'None');
  const [tags, setTags] = useState<string>(initialDream?.tags.join(', ') || '');
  const [interpretation, setInterpretation] = useState<string>(initialDream?.interpretation || '');
  const [isInterpreting, setIsInterpreting] = useState(false);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const dream: Dream = {
      id: initialDream?.id || crypto.randomUUID(),
      title,
      content,
      date: initialDream?.date || new Date().toISOString(),
      mood,
      lucidity,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      interpretation: interpretation || undefined
    };
    onSave(dream);
  };

  const handleInterpret = async () => {
    if (!content.trim()) return;
    
    setIsInterpreting(true);
    const tempDream: Dream = {
      id: 'temp',
      title,
      content,
      date: new Date().toISOString(),
      mood,
      lucidity,
      tags: [],
    };
    
    const result = await interpretDream(tempDream);
    setInterpretation(result);
    setIsInterpreting(false);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-0">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-white">
          {initialDream ? 'Edit Dream' : 'New Dream Entry'}
        </h2>
        <button 
          onClick={handleSave}
          disabled={!title || !content}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-4">
          <input
            type="text"
            placeholder="Dream Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-night-800 border-none rounded-xl p-4 text-xl font-bold text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          
          <textarea
            placeholder="Describe your dream in detail..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[60vh] bg-night-800 border-none rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* AI Interpretation Section */}
          <div className="bg-night-800 p-5 rounded-xl border border-night-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                AI Analysis
              </h3>
            </div>
            
            {interpretation ? (
              <div className="prose prose-invert prose-sm max-h-60 overflow-y-auto custom-scrollbar">
                 <ReactMarkdown>{interpretation}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-500 text-sm">
                Write your dream and ask Gemini to interpret the symbols.
              </div>
            )}
            
            <button
              onClick={handleInterpret}
              disabled={isInterpreting || !content}
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all"
            >
              {isInterpreting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Interpreting...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Interpret Dream
                </>
              )}
            </button>
          </div>

          {/* Details Section */}
          <div className="bg-night-800 p-5 rounded-xl border border-night-700 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Mood</label>
              <div className="grid grid-cols-3 gap-2">
                {MOODS.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.label}
                      onClick={() => setMood(m.label)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                        mood === m.label 
                        ? 'bg-indigo-500/20 border-indigo-500 text-white' 
                        : 'bg-night-900 border-transparent text-slate-500 hover:bg-night-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${mood === m.label ? m.color : ''}`} />
                      <span className="text-[10px]">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lucidity</label>
              <select
                value={lucidity}
                onChange={(e) => setLucidity(e.target.value as LucidityLevel)}
                className="w-full bg-night-900 text-slate-200 p-2 rounded-lg border border-night-700 focus:border-indigo-500 outline-none"
              >
                {LUCIDITY_LEVELS.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tags</label>
              <input
                type="text"
                placeholder="flying, nightmare, recurring..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-night-900 text-slate-200 p-2 rounded-lg border border-night-700 focus:border-indigo-500 outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};