import { PawPrint, BellRing, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 via-amber-100 to-emerald-100 p-6 shadow-lg">
      <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-rose-300/50 blur-3xl"
          animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-amber-300/50 blur-3xl"
          animate={{ y: [0, -8, 0], x: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 9 }}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 backdrop-blur shadow">
          <PawPrint className="text-rose-500" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Feedie</h1>
          <p className="text-sm text-gray-600">Joyful reminders for your favorite companions</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 text-rose-600">
        <BellRing className="h-5 w-5" />
        <p className="text-sm">Customize tones, schedules, and art styles for each pet</p>
        <Sparkles className="h-5 w-5 text-amber-500" />
      </div>
    </div>
  );
}
