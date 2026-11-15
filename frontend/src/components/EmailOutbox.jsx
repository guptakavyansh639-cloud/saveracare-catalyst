import { X, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const TRIGGER_COLORS = {
  'missed_dose': 'bg-red-100 text-red-800',
  'reminder': 'bg-blue-100 text-blue-800',
  'appointment': 'bg-emerald-100 text-emerald-800',
  'alert': 'bg-amber-100 text-amber-800',
};

function EmailEntry({ email }) {
  const [expanded, setExpanded] = useState(false);
  const triggerClass = TRIGGER_COLORS[email.trigger_type] || TRIGGER_COLORS.alert;

  return (
    <div className="border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-3">
        <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-800 truncate">{email.recipient || email.to}</span>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${triggerClass}`}>
              {email.trigger_type || 'alert'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {email.timestamp ? new Date(email.timestamp).toLocaleString() : ''}
          </p>
          {email.subject && <p className="text-sm text-gray-600 mt-1">{email.subject}</p>}
        </div>
        {email.html_body && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>
      {expanded && email.html_body && (
        <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg">
          <div
            className="text-sm prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: email.html_body }}
          />
        </div>
      )}
    </div>
  );
}

export default function EmailOutbox({ emails = [], isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 transition-transform">
      <div className="max-w-4xl mx-auto bg-white rounded-t-2xl shadow-2xl border border-gray-200 max-h-[60vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">📧 Email Outbox — Dispatch Receipts</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {emails.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Mail className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p>No emails sent yet</p>
            </div>
          ) : (
            emails.map((email, i) => <EmailEntry key={i} email={email} />)
          )}
        </div>
      </div>
    </div>
  );
}
