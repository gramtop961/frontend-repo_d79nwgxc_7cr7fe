import { useState } from "react";
import { AlarmClock, Plus, X, Repeat } from "lucide-react";

function TimeRow({ value, note, recurring, onChange, onRemove }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 p-3">
      <AlarmClock className="h-5 w-5 text-rose-500" />
      <input
        type="time"
        value={value}
        onChange={(e) => onChange({ value: e.target.value, note, recurring })}
        className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-gray-800"
      />
      <input
        type="text"
        value={note}
        placeholder="Meal notes"
        onChange={(e) => onChange({ value, note: e.target.value, recurring })}
        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700"
      />
      <label className="flex items-center gap-1 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={recurring}
          onChange={(e) => onChange({ value, note, recurring: e.target.checked })}
        />
        <Repeat className="h-4 w-4" /> Recurring
      </label>
      <button onClick={onRemove} className="rounded-lg p-1 text-gray-500 hover:bg-gray-100">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function ScheduleSetup({ schedule, onChange }) {
  const [time, setTime] = useState("08:00");

  function addTime() {
    const next = [...schedule, { value: time, note: "", recurring: true }];
    onChange(next);
  }

  function updateRow(i, row) {
    const next = schedule.map((r, idx) => (idx === i ? row : r));
    onChange(next);
  }

  function removeRow(i) {
    const next = schedule.filter((_, idx) => idx !== i);
    onChange(next);
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Feeding schedule</h2>
        <div className="flex items-center gap-2">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-gray-800"
          />
          <button
            onClick={addTime}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {schedule.length === 0 ? (
          <p className="text-sm text-gray-600">No reminders yet. Add your first feeding time.</p>
        ) : (
          schedule.map((row, i) => (
            <TimeRow
              key={`${row.value}-${i}`}
              value={row.value}
              note={row.note}
              recurring={row.recurring}
              onChange={(r) => updateRow(i, r)}
              onRemove={() => removeRow(i)}
            />
          ))
        )}
      </div>
    </div>
  );
}
