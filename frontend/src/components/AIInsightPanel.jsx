import { useState } from 'react';
import { Bot, AlertTriangle, Check, Activity } from 'lucide-react';

const TABS = [
  { key: 'interaction', label: '🔬 Drug Interaction Check' },
  { key: 'visit', label: '📋 Doctor Visit Prep' },
  { key: 'explain', label: '💬 Explain My Medicines' },
];

export default function AIInsightPanel({ medications, moodHistory, insight, onRunAnalysis, loading }) {
  const [activeTab, setActiveTab] = useState('interaction');

  const handleRun = () => {
    onRunAnalysis(activeTab);
  };

  const renderInsight = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center py-8">
          <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-3" />
          <p className="text-sm text-gray-500">Analyzing with Gemini AI...</p>
        </div>
      );
    }

    if (!insight) {
      return (
        <div className="text-center py-8 text-gray-400">
          <Bot className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p>Click "Run Analysis" to get AI-powered insights</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Warnings */}
        {insight.warnings && insight.warnings.length > 0 && (
          <div className="space-y-2">
            {insight.warnings.map((w, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{w}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        {insight.tips && insight.tips.length > 0 && (
          <div className="space-y-2">
            {insight.tips.map((t, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">{t}</p>
              </div>
            ))}
          </div>
        )}

        {/* Questions */}
        {insight.questions && insight.questions.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Questions for Doctor</p>
            <div className="space-y-1.5">
              {insight.questions.map((q, i) => (
                <label key={i} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-400" />
                  {q}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Raw text fallback */}
        {insight.text && !insight.warnings && !insight.tips && (
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{insight.text}</p>
          </div>
        )}

        {/* Summary */}
        {insight.summary && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-sm text-emerald-800">{insight.summary}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-6 h-6 text-emerald-600" />
        <h2 className="text-lg font-bold text-gray-800">🤖 AI Care Insight — Powered by Gemini</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              activeTab === tab.key
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderInsight()}

      <button
        onClick={handleRun}
        disabled={loading}
        className="w-full mt-4 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {loading ? 'Analyzing...' : '🔍 Run Analysis'}
      </button>
    </div>
  );
}
