import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function AppointmentForm({ editing, onSave, onClose }) {
  const [form, setForm] = useState({
    doctor_name: '',
    specialty: '',
    clinic: '',
    date: '',
    time: '',
    notes: '',
    transport: '',
    checklist: [],
  });
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (editing) {
      setForm({
        doctor_name: editing.doctor_name || '',
        specialty: editing.specialty || '',
        clinic: editing.clinic || '',
        date: editing.date || '',
        time: editing.time || '',
        notes: editing.notes || '',
        transport: editing.transport || '',
        checklist: editing.checklist || [],
      });
    }
  }, [editing]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addChecklistItem = () => {
    if (newItem.trim()) {
      setForm((prev) => ({ ...prev, checklist: [...prev.checklist, newItem.trim()] }));
      setNewItem('');
    }
  };

  const removeChecklistItem = (index) => {
    setForm((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: editing?.id });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            {editing ? '✏️ Edit Appointment' : '📅 Add Appointment'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
            <input
              type="text"
              required
              value={form.doctor_name}
              onChange={(e) => updateField('doctor_name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="e.g., Dr. Mehra"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <input
                type="text"
                value={form.specialty}
                onChange={(e) => updateField('specialty', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                placeholder="e.g., Cardiologist"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinic</label>
              <input
                type="text"
                value={form.clinic}
                onChange={(e) => updateField('clinic', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                placeholder="e.g., Heart Care Clinic"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => updateField('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                required
                value={form.time}
                onChange={(e) => updateField('time', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="Any notes for the visit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transport</label>
            <input
              type="text"
              value={form.transport}
              onChange={(e) => updateField('transport', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="e.g., Car with Ananya"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Checklist</label>
            <div className="space-y-2 mb-2">
              {form.checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                  <span className="flex-1 text-sm text-gray-700">{item}</span>
                  <button
                    type="button"
                    onClick={() => removeChecklistItem(i)}
                    className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                placeholder="Add checklist item"
              />
              <button
                type="button"
                onClick={addChecklistItem}
                className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {editing ? 'Update Appointment' : 'Add Appointment'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
