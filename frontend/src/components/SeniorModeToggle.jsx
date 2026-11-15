import { Eye, ZoomIn } from 'lucide-react';

export default function SeniorModeToggle({ active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
        active
          ? 'bg-emerald-600 text-white shadow-md'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      aria-label="Toggle Senior Mode"
      title="Toggle Senior Mode for larger text and buttons"
    >
      {active ? <ZoomIn className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      <span>A+</span>
    </button>
  );
}
