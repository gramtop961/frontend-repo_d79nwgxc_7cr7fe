import { useMemo, useState } from "react";
import Header from "./components/Header";
import PetSetup from "./components/PetSetup";
import ScheduleSetup from "./components/ScheduleSetup";
import SoundCustomizer from "./components/SoundCustomizer";
import FeedLog from "./components/FeedLog";

function useStreak(log) {
  // Very simple local streak calculation based on last N days completed
  return useMemo(() => {
    const days = log.slice(-7);
    let s = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].every((x) => x.done)) s += 1;
      else break;
    }
    return s;
  }, [log]);
}

export default function App() {
  const [pet, setPet] = useState({ type: "cat", name: "Luna", theme: "pastel", photo: "" });
  const [schedule, setSchedule] = useState([
    { value: "08:00", note: "Add vitamins", recurring: true },
    { value: "18:00", note: "Wet food only", recurring: true },
  ]);
  const [tone, setTone] = useState({ type: "preset", id: "happy-meow", label: "Happy Meow" });

  // Build today checklist from schedule
  const [today, setToday] = useState(() => schedule.map((s) => ({ time: s.value, note: s.note, done: false })));
  const [history, setHistory] = useState([today]);

  function syncTodayFromSchedule(nextSchedule) {
    setToday(nextSchedule.map((s) => ({ time: s.value, note: s.note, done: false })));
    setHistory((h) => {
      const newToday = nextSchedule.map((s) => ({ time: s.value, note: s.note, done: false }));
      const next = [...h];
      next[next.length - 1] = newToday;
      return next;
    });
  }

  const streak = useStreak(history);

  function toggleToday(i) {
    setToday((t) => {
      const next = t.map((x, idx) => (idx === i ? { ...x, done: !x.done } : x));
      setHistory((h) => {
        const copy = [...h];
        copy[copy.length - 1] = next;
        return copy;
      });
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50 p-4">
      <div className="mx-auto max-w-md space-y-4">
        <Header />

        <div className="rounded-3xl bg-white/60 p-2 backdrop-blur">
          <div className="grid grid-cols-1 gap-3">
            <PetSetup pet={pet} onChange={setPet} />
            <ScheduleSetup
              schedule={schedule}
              onChange={(next) => {
                setSchedule(next);
                syncTodayFromSchedule(next);
              }}
            />
            <SoundCustomizer tone={tone} onChange={setTone} petName={pet.name} petType={pet.type} />
            <FeedLog todayItems={today} onToggle={toggleToday} streak={streak} />
          </div>
        </div>

        <footer className="pb-6 pt-2 text-center text-xs text-gray-500">
          Made with love for pets • Feedie
        </footer>
      </div>
    </div>
  );
}
