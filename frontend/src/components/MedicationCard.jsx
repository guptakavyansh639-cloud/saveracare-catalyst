import { Volume2, Check, X, Pencil, Trash2, Clock } from 'lucide-react';
import { speakText } from '../utils/speak';

const PILL_COLORS = {
  White: 'bg-gray-100 border-gray-300',
  Peach: 'bg-orange-200 border-orange-300',
  Blue: 'bg-blue-300 border-blue-400',
  Yellow: 'bg-yellow-200 border-yellow-300',
  Pink: 'bg-pink-200 border-pink-300',
  Green: 'bg-green-200 border-green-300',
};

function PillVisual({ shape, color }) {
  const colorClass = PILL_COLORS[color] || PILL_COLORS.White;
  if (shape === 'Capsule') {
    return (
      <div className="flex">
        <div className={`w-7 h-8 rounded-l-full ${colorClass} border-2`} />
        <div className="w-7 h-8 rounded-r-full bg-white border-2 border-gray-300" />
      </div>
    );
  }
  if (shape === 'Oval') {
    return <div className={`w-14 h-8 rounded-full ${colorClass} border-2`} />;
  }
  // Round
  return <div className={`w-10 h-10 rounded-full ${colorClass} border-2`} />;
}

function StatusBadge({ status }) {
  if (status === 'taken') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <Check className="w-3 h-3" /> Taken
      </span>
    );
  }
  if (status === 'missed') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <X className="w-3 h-3" /> Missed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
      <Clock className="w-3 h-3" /> Pending
    </span>
  );
}

export default function MedicationCard({ med, onTake, onMiss, onEdit, onDelete, mode, seniorMode }) {
  const foodRuleDisplay = med.food_rule === 'Empty Stomach'
    ? { label: '🕐 Empty Stomach', cls: 'bg-amber-100 text-amber-800' }
    : med.food_rule === 'Before Meal'
    ? { label: '🍽️ Before Meal', cls: 'bg-blue-100 text-blue-800' }
    : { label: '🍽️ After Meal', cls: 'bg-green-100 text-green-800' };

  const speakEN = () => {
    speakText(`${med.name} ${med.dosage}, take ${med.food_rule}, ${med.purpose}`, 'en-US');
  };

  const speakHI = () => {
    speakText(med.instructions_hi || med.name, 'hi-IN');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <PillVisual shape={med.pill_shape} color={med.pill_color} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className={`font-bold text-gray-900 ${seniorMode ? 'text-xl' : 'text-lg'} card-text`}>
                {med.name}
              </h3>
              <p className={`text-gray-600 ${seniorMode ? 'text-base' : 'text-sm'}`}>{med.dosage}</p>
            </div>
            <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${foodRuleDisplay.cls}`}>
              {foodRuleDisplay.label}
            </span>
          </div>

          {med.purpose && (
            <p className={`text-gray-500 mt-1 ${seniorMode ? 'text-base' : 'text-sm'}`}>{med.purpose}</p>
          )}

          {/* Schedule & Status */}
          <div className="flex flex-wrap gap-2 mt-3">
            {med.doses_today && Object.entries(med.doses_today).map(([time, status]) => (
              <div key={time} className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-gray-500">{time}</span>
                <StatusBadge status={status} />
                {mode === 'carecircle' && status === 'pending' && (
                  <div className="flex gap-1 ml-1">
                    <button
                      onClick={() => onTake(med.id, time)}
                      className="px-2 py-0.5 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      ✅ Take
                    </button>
                    <button
                      onClick={() => onMiss(med.id, time)}
                      className="px-2 py-0.5 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      ❌ Miss
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action row */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <button
              onClick={speakEN}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <Volume2 className="w-3.5 h-3.5" /> EN
            </button>
            <button
              onClick={speakHI}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <Volume2 className="w-3.5 h-3.5" /> HI
            </button>

            {mode === 'carecircle' && (
              <>
                <button
                  onClick={() => onEdit(med)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ml-auto"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => onDelete(med.id)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
