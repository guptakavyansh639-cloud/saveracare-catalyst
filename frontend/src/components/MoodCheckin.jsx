import { useState } from 'react';
import { Smile, Activity } from 'lucide-react';

const ENERGY_EMOJIS = ['😴', '😐', '🙂', '😊', '💪'];
const DIZZY_EMOJIS = ['😌', '🤔', '😕', '😖', '😵'];
const APPETITE_EMOJIS = ['😕', '😐', '🙂', '😊', '😋'];

function ScaleRow({ label, emoji, emojis, value, onChange, seniorMode }) {
  return (
    <div className="mb-4">
      <p className={`font-medium text-gray-700 mb-2 ${seniorMode ? 'text-lg' : 'text-sm'}`}>
        {emoji} {label}
      </p>
      <div className="flex gap-2">
        {emojis.map((em, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i + 1)}
            className={`flex-1 py-3 rounded-xl text-center text-2xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              value === i + 1
                ? 'bg-emerald-100 border-2 border-emerald-500 shadow-sm scale-110'
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
            }`}
            title={`Level ${i + 1}`}
          >
            {em}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MoodCheckin({ onSubmit, history = [], seniorMode }) {
  const [energy, setEnergy] = useState(0);
  const [dizziness, setDizziness] = useState(0);
  const [appetite, setAppetite] = useState(0);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!energy || !dizziness || !appetite) return;
    onSubmit({
      energy,
      dizziness,
      appetite,
      notes,
      timestamp: new Date().toISOString(),
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setEnergy(0);
    setDizziness(0);
    setAppetite(0);
    setNotes('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Smile className="w-6 h-6 text-emerald-600" />
        <h2 className={`font-bold text-gray-800 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
          😊 How I Feel Today
        </h2>
      </div>

      <ScaleRow label="Energy" emoji="⚡" emojis={ENERGY_EMOJIS} value={energy} onChange={setEnergy} seniorMode={seniorMode} />
      <ScaleRow label="Dizziness" emoji="🌀" emojis={DIZZY_EMOJIS} value={dizziness} onChange={setDizziness} seniorMode={seniorMode} />
      <ScaleRow label="Appetite" emoji="🍽️" emojis={APPETITE_EMOJIS} value={appetite} onChange={setAppetite} seniorMode={seniorMode} />

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        placeholder="Any notes about how you feel..."
        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 mb-3 text-sm"
      />

      <button
        onClick={handleSubmit}
        disabled={!energy || !dizziness || !appetite}
        className="w-full py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {submitted ? '✓ Check-in Logged!' : 'Log Check-in'}
      </button>

      {/* Recent history */}
      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Recent Check-ins</p>
          <div className="space-y-2">
            {history.slice(0, 3).map((h, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                <Activity className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="flex-1">
                  ⚡{h.energy} 🌀{h.dizziness} 🍽️{h.appetite}
                  {h.notes && <span className="text-gray-400 ml-2">— {h.notes}</span>}
                </span>
                <span className="text-xs text-gray-400">
                  {h.timestamp ? new Date(h.timestamp).toLocaleDateString() : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
