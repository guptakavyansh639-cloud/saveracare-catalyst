import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const SHAPES = ['Round', 'Oval', 'Capsule'];
const COLORS = ['White', 'Peach', 'Blue', 'Yellow', 'Pink', 'Green'];
const FOOD_RULES = ['After Meal', 'Before Meal', 'Empty Stomach'];

export default function MedicationForm({ editing, onSave, onClose }) {
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    pill_shape: 'Round',
    pill_color: 'White',
    food_rule: 'After Meal',
    schedule_times: ['08:00'],
    purpose: '',
    instructions_hi: '',
  });

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || '',
        dosage: editing.dosage || '',
        pill_shape: editing.pill_shape || 'Round',
        pill_color: editing.pill_color || 'White',
        food_rule: editing.food_rule || 'After Meal',
        schedule_times: editing.schedule_times || ['08:00'],
        purpose: editing.purpose || '',
        instructions_hi: editing.instructions_hi || '',
      });
    }
  }, [editing]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTimeSlot = () => {
    setForm((prev) => ({ ...prev, schedule_times: [...prev.schedule_times, '12:00'] }));
  };

  const removeTimeSlot = (index) => {
    setForm((prev) => ({
      ...prev,
      schedule_times: prev.schedule_times.filter((_, i) => i !== index),
    }));
  };

  const updateTime = (index, value) => {
    setForm((prev) => {
      const times = [...prev.schedule_times];
      times[index] = value;
      return { ...prev, schedule_times: times };
    });
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
            {editing ? '✏️ Edit Medication' : '💊 Add Medication'}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="e.g., Amlodipine"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
            <input
              type="text"
              required
              value={form.dosage}
              onChange={(e) => updateField('dosage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="e.g., 5 mg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pill Shape</label>
              <select
                value={form.pill_shape}
                onChange={(e) => updateField('pill_shape', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              >
                {SHAPES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pill Color</label>
              <select
                value={form.pill_color}
                onChange={(e) => updateField('pill_color', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              >
                {COLORS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food Rule</label>
            <select
              value={form.food_rule}
              onChange={(e) => updateField('food_rule', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
            >
              {FOOD_RULES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Times</label>
            <div className="space-y-2">
              {form.schedule_times.map((time, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => updateTime(i, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                  {form.schedule_times.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(i)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addTimeSlot}
              className="flex items-center gap-1 mt-2 px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <Plus className="w-4 h-4" /> Add Time
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
            <input
              type="text"
              value={form.purpose}
              onChange={(e) => updateField('purpose', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="e.g., Controls blood pressure"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hindi Instructions</label>
            <textarea
              value={form.instructions_hi}
              onChange={(e) => updateField('instructions_hi', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="हिंदी में निर्देश"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {editing ? 'Update Medication' : 'Add Medication'}
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
