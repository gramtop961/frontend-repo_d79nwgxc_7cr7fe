import { useMemo } from "react";
import { CheckCircle2, Flame, CalendarDays } from "lucide-react";

export default function FeedLog({ todayItems, onToggle, streak }) {
  const completed = useMemo(() => todayItems.filter((i) => i.done).length, [todayItems]);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Today</h2>
        <div className="flex items-center gap-2 rounded-xl bg-rose-100 px-3 py-1 text-rose-700">
          <Flame className="h-4 w-4" />
          <span className="text-sm font-medium">Streak: {streak} days</span>
        </div>
      </div>

      <div className="space-y-2">
        {todayItems.length === 0 ? (
          <div className="flex items-center gap-2 rounded-2xl border border-dashed border-gray-300 p-4 text-sm text-gray-600">
            <CalendarDays className="h-4 w-4" /> Add schedule times to see them here.
          </div>
        ) : (
          todayItems.map((item, idx) => (
            <button
              key={`${item.time}-${idx}`}
              onClick={() => onToggle(idx)}
              className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition ${
                item.done ? "border-emerald-300 bg-emerald-50" : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div>
                <p className="font-medium text-gray-800">{item.time}</p>
                {item.note && <p className="text-xs text-gray-600">{item.note}</p>}
              </div>
              <CheckCircle2 className={`h-5 w-5 ${item.done ? "text-emerald-600" : "text-gray-300"}`} />
            </button>
          ))
        )}
      </div>

      {todayItems.length > 0 && (
        <p className="mt-3 text-center text-xs text-gray-500">
          Mark meals as fed to keep your streak alive!
        </p>
      )}
    </div>
  );
}
