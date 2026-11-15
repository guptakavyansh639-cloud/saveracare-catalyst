import { useState } from 'react';
import { Shield, Delete, X } from 'lucide-react';

export default function PasscodeGate({ onVerify }) {
  const [digits, setDigits] = useState([]);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDigit = (d) => {
    if (digits.length >= 4) return;
    const next = [...digits, d];
    setDigits(next);
    setError('');
    if (next.length === 4) {
      submitCode(next.join(''));
    }
  };

  const submitCode = (code) => {
    if (code === '2468') {
      setSuccess(true);
      setTimeout(() => onVerify(true), 600);
    } else {
      setShake(true);
      setError('Incorrect passcode');
      setTimeout(() => {
        setShake(false);
        setDigits([]);
      }, 600);
    }
  };

  const handleBackspace = () => {
    setDigits((prev) => prev.slice(0, -1));
    setError('');
  };

  const handleClear = () => {
    setDigits([]);
    setError('');
  };

  const handleQuickAccess = () => {
    setDigits([2, 4, 6, 8]);
    setTimeout(() => submitCode('2468'), 300);
  };

  const numButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-sm text-center ${shake ? 'animate-shake' : ''}`}
        style={shake ? { animation: 'shake 0.5s ease-in-out' } : {}}
      >
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${success ? 'bg-green-100' : 'bg-emerald-100'}`}>
            <Shield className={`w-8 h-8 ${success ? 'text-green-600' : 'text-emerald-600'}`} />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-1">🔐 Care Circle Access</h2>
        <p className="text-sm text-gray-500 mb-6">Enter passcode to manage medications & appointments</p>

        {/* Digit display */}
        <div className="flex justify-center gap-3 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-all ${
                digits[i] !== undefined
                  ? success
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              {digits[i] !== undefined ? '●' : ''}
            </div>
          ))}
        </div>

        {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm font-medium mb-4">✓ Access Granted!</p>}

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {numButtons.map((n) => (
            <button
              key={n}
              onClick={() => handleDigit(n)}
              className="w-full h-16 rounded-xl bg-gray-50 border border-gray-200 text-xl font-semibold text-gray-800 hover:bg-emerald-50 hover:border-emerald-300 active:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {n}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="w-full h-16 rounded-xl bg-gray-100 border border-gray-200 text-sm font-medium text-gray-600 hover:bg-red-50 hover:border-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDigit(0)}
            className="w-full h-16 rounded-xl bg-gray-50 border border-gray-200 text-xl font-semibold text-gray-800 hover:bg-emerald-50 hover:border-emerald-300 active:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="w-full h-16 rounded-xl bg-gray-100 border border-gray-200 text-sm font-medium text-gray-600 hover:bg-amber-50 hover:border-amber-300 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 flex items-center justify-center"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Quick access for judges */}
        <button
          onClick={handleQuickAccess}
          className="w-full py-3 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-800 font-bold text-base hover:bg-amber-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          🎯 Judge Quick Access (2468)
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}
