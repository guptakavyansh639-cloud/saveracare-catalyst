import { Check, Clock } from 'lucide-react';

export default function CareProposalCard({ proposal, onRespond }) {
  const isResolved = proposal.status && proposal.status !== 'pending';

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
          <span className="text-lg">💡</span>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-medium">
            {proposal.proposed_by || 'Care Circle'} suggests changing your{' '}
            <span className="font-bold text-emerald-700">{proposal.medication_name || 'medication'}</span>{' '}
            to <span className="font-bold">{proposal.proposed_time}</span>
          </p>
          {proposal.reason && (
            <p className="text-sm text-gray-500 mt-1">{proposal.reason}</p>
          )}

          {isResolved ? (
            <div className="mt-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                proposal.status === 'accepted'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {proposal.status === 'accepted' ? (
                  <><Check className="w-4 h-4" /> Accepted</>
                ) : (
                  <><Clock className="w-4 h-4" /> Preferred Later</>
                )}
              </span>
            </div>
          ) : (
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onRespond(proposal.id, 'accepted')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                ✅ Accept Time
              </button>
              <button
                onClick={() => onRespond(proposal.id, 'deferred')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                🕐 Prefer 30 Mins Later
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
