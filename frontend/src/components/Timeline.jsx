import { Check, X, Activity, Mail, Smile, Clock } from 'lucide-react';

const ICONS = {
  dose_taken: { icon: Check, color: 'text-green-500', bg: 'bg-green-100' },
  dose_missed: { icon: X, color: 'text-red-500', bg: 'bg-red-100' },
  mood_checkin: { icon: Smile, color: 'text-amber-500', bg: 'bg-amber-100' },
  care_proposal: { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100' },
  email_sent: { icon: Mail, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  default: { icon: Activity, color: 'text-gray-500', bg: 'bg-gray-100' },
};

export default function Timeline({ events = [] }) {
  const sorted = [...events].sort((a, b) => {
    const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return tb - ta;
  }).slice(0, 10);

  if (sorted.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-3">📋 Recent Activity</h2>
        <p className="text-sm text-gray-400 text-center py-4">No activity yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4">📋 Recent Activity</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-4">
          {sorted.map((event, i) => {
            const conf = ICONS[event.type] || ICONS.default;
            const IconComponent = conf.icon;
            return (
              <div key={i} className="flex items-start gap-3 relative">
                <div className={`w-10 h-10 rounded-full ${conf.bg} flex items-center justify-center z-10 flex-shrink-0`}>
                  <IconComponent className={`w-5 h-5 ${conf.color}`} />
                </div>
                <div className="flex-1 pt-1.5">
                  <p className="text-sm text-gray-700">{event.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {event.timestamp ? new Date(event.timestamp).toLocaleString() : ''}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
