import { useState } from 'react';
import { Zap } from 'lucide-react';

export default function JudgeScenarioBar({ onScenario }) {
  const [toast, setToast] = useState('');

  const handleClick = (num) => {
    onScenario(num);
    setToast(`✓ Scenario ${num} loaded`);
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="bg-gray-900 text-white px-4 py-2 flex items-center gap-3 flex-wrap z-50 relative">
      <div className="flex items-center gap-2 font-semibold text-sm">
        <Zap className="w-4 h-4 text-yellow-400" />
        <span>Judge Testing</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => handleClick(1)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-amber-500 text-white hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          ☀️ Morning Routine
        </button>
        <button
          onClick={() => handleClick(2)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          🚨 Missed BP Pill → Email
        </button>
        <button
          onClick={() => handleClick(3)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          💊 Add Antibiotic + AI Check
        </button>
      </div>
      {toast && (
        <span className="ml-auto bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
          {toast}
        </span>
      )}
    </div>
  );
}
