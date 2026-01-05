import React, { useState } from 'react';
import { REALITY_CHECKS } from '../constants';
import { Eye, CheckCircle, RefreshCcw } from 'lucide-react';

export const RealityCheck: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (activeStep < REALITY_CHECKS.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const reset = () => {
    setActiveStep(0);
    setCompleted(false);
  };

  return (
    <div className="max-w-2xl mx-auto text-center pt-10 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Reality Check</h2>
        <p className="text-slate-400">Perform these checks to build the habit of questioning your reality. This helps trigger lucidity during dreams.</p>
      </div>

      <div className="bg-night-800 rounded-2xl p-8 border border-night-700 shadow-2xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-night-700 w-full">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${((activeStep + (completed ? 1 : 0)) / REALITY_CHECKS.length) * 100}%` }}
          />
        </div>

        {completed ? (
          <div className="py-10 animate-fade-in">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">You are awake!</h3>
            <p className="text-slate-300 mb-8">
              Or are you? Always assume you might be dreaming until proven otherwise. Great job practicing.
            </p>
            <button
              onClick={reset}
              className="bg-night-700 hover:bg-night-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              Practice Again
            </button>
          </div>
        ) : (
          <div className="py-6">
            <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full mb-6">
              Step {activeStep + 1} of {REALITY_CHECKS.length}
            </span>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {REALITY_CHECKS[activeStep].title}
            </h3>
            
            <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              {REALITY_CHECKS[activeStep].description}
            </p>

            <div className="bg-night-900/50 p-6 rounded-xl border border-night-700 mb-8 max-w-md mx-auto">
              <p className="text-indigo-300 font-medium">Action:</p>
              <p className="text-white text-lg">{REALITY_CHECKS[activeStep].action}</p>
            </div>

            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
            >
              I've done this check
            </button>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div className="p-4 bg-night-800/50 rounded-lg border border-night-700/50">
          <Eye className="w-6 h-6 text-purple-400 mb-2" />
          <h4 className="text-white font-medium mb-1">Consistency</h4>
          <p className="text-xs text-slate-400">Perform checks 5-10 times a day to build muscle memory.</p>
        </div>
        <div className="p-4 bg-night-800/50 rounded-lg border border-night-700/50">
          <Eye className="w-6 h-6 text-blue-400 mb-2" />
          <h4 className="text-white font-medium mb-1">Questioning</h4>
          <p className="text-xs text-slate-400">Don't just go through motions. Sincerely ask "Am I dreaming?".</p>
        </div>
        <div className="p-4 bg-night-800/50 rounded-lg border border-night-700/50">
          <Eye className="w-6 h-6 text-pink-400 mb-2" />
          <h4 className="text-white font-medium mb-1">Triggers</h4>
          <p className="text-xs text-slate-400">Do checks when something weird happens or you see a specific object.</p>
        </div>
      </div>
    </div>
  );
};