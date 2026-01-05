import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { DreamCard } from './components/DreamCard';
import { DreamEditor } from './components/DreamEditor';
import { RealityCheck } from './components/RealityCheck';
import { Stats } from './components/Stats';
import { Dream, ViewState } from './types';
import { getDreams, saveDream, deleteDream } from './services/storage';
import { Plus } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('JOURNAL');
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [editingDream, setEditingDream] = useState<Dream | undefined>(undefined);

  useEffect(() => {
    // Load initial data
    setDreams(getDreams());
  }, [view]); // Reload when view changes to ensure fresh data

  const handleSaveDream = (dream: Dream) => {
    saveDream(dream);
    setDreams(getDreams());
    setEditingDream(undefined);
    setView('JOURNAL');
  };

  const handleDeleteDream = (id: string) => {
    if (confirm('Are you sure you want to delete this dream?')) {
      deleteDream(id);
      setDreams(getDreams());
    }
  };

  const handleEditDream = (dream: Dream) => {
    setEditingDream(dream);
    setView('ADD');
  };

  const renderContent = () => {
    switch (view) {
      case 'JOURNAL':
        return (
          <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Your Journal</h1>
                <p className="text-slate-400 text-sm">Record and explore your subconscious.</p>
              </div>
              <button 
                onClick={() => { setEditingDream(undefined); setView('ADD'); }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full md:hidden shadow-lg shadow-indigo-500/30"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            
            {dreams.length === 0 ? (
              <div className="text-center py-20 bg-night-800/30 rounded-2xl border border-dashed border-night-700">
                <p className="text-slate-500 mb-4">Your dream journal is empty.</p>
                <button 
                  onClick={() => setView('ADD')}
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Record your first dream
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {dreams.map(dream => (
                  <DreamCard 
                    key={dream.id} 
                    dream={dream} 
                    onEdit={handleEditDream}
                    onDelete={handleDeleteDream}
                  />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'ADD':
        return (
          <DreamEditor 
            initialDream={editingDream}
            onSave={handleSaveDream} 
            onCancel={() => { setEditingDream(undefined); setView('JOURNAL'); }} 
          />
        );

      case 'REALITY_CHECK':
        return <RealityCheck />;

      case 'STATS':
        return <Stats dreams={dreams} />;

      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-night-900 text-slate-200 flex flex-col md:flex-row font-sans">
      <Navigation currentView={view} setView={setView} />
      
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8 relative scroll-smooth">
        {/* Decorative Background Elements */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}