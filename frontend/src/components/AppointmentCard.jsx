import { Calendar, Clock, FileText, Pencil, Trash2, Send, Car } from 'lucide-react';

export default function AppointmentCard({ appointment, onEdit, onDelete, onSendReminder, mode }) {
  const apt = appointment;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{apt.doctor_name}</h3>
            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {apt.specialty}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-3">{apt.clinic}</p>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
              <Calendar className="w-4 h-4" />
              {apt.date}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
              <Clock className="w-4 h-4" />
              {apt.time}
            </div>
          </div>

          {apt.notes && (
            <div className="flex items-start gap-2 mb-3 p-2 bg-amber-50 rounded-lg">
              <FileText className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">{apt.notes}</p>
            </div>
          )}

          {apt.transport && (
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <Car className="w-4 h-4 text-gray-400" />
              {apt.transport}
            </div>
          )}

          {apt.checklist && apt.checklist.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Checklist</p>
              <ul className="space-y-1">
                {apt.checklist.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 flex-wrap">
        <button
          onClick={() => onSendReminder(apt)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <Send className="w-3.5 h-3.5" /> 📧 Send Reminder
        </button>

        {mode === 'carecircle' && (
          <>
            <button
              onClick={() => onEdit(apt)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ml-auto"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </button>
            <button
              onClick={() => onDelete(apt.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
