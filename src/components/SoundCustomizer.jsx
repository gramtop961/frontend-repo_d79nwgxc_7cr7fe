import { useEffect, useRef, useState } from "react";
import { Music2, Play, Upload } from "lucide-react";

const PRESETS = [
  { id: "happy-meow", name: "Happy Meow" },
  { id: "gentle-bark", name: "Gentle Bark" },
  { id: "playful-whistle", name: "Playful Whistle" },
];

function useTonePlayer() {
  const ctxRef = useRef(null);

  useEffect(() => {
    return () => {
      ctxRef.current?.close?.();
    };
  }, []);

  function ensureCtx() {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctxRef.current;
  }

  function playPreset(id) {
    const ctx = ensureCtx();

    // Simple synthesized cues for demo purposes
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g).connect(ctx.destination);

    const now = ctx.currentTime;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.2, now + 0.02);
    g.gain.linearRampToValueAtTime(0.0001, now + 1.0);

    if (id === "happy-meow") {
      o.type = "sawtooth";
      o.frequency.setValueAtTime(500, now);
      o.frequency.exponentialRampToValueAtTime(300, now + 0.3);
      // Little chirp tail
      setTimeout(() => {
        o.frequency.setValueAtTime(700, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.2);
      }, 300);
    } else if (id === "gentle-bark") {
      o.type = "square";
      o.frequency.setValueAtTime(180, now);
      // Two short woofs
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.25, now + 0.03);
      g.gain.linearRampToValueAtTime(0.0001, now + 0.18);
      setTimeout(() => {
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.03);
        g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      }, 220);
    } else {
      // playful-whistle
      o.type = "sine";
      o.frequency.setValueAtTime(800, now);
      o.frequency.exponentialRampToValueAtTime(1200, now + 0.8);
    }

    o.start();
    o.stop(now + 1.1);
  }

  function playFile(fileUrl) {
    const audio = new Audio(fileUrl);
    audio.play();
  }

  return { playPreset, playFile };
}

export default function SoundCustomizer({ tone, onChange, petName, petType }) {
  const { playPreset, playFile } = useTonePlayer();
  const [fileUrl, setFileUrl] = useState("");

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    onChange({ type: "custom", src: url, label: file.name });
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h2 className="mb-3 text-lg font-semibold text-gray-800">Sound & tones</h2>
      <p className="mb-4 text-sm text-gray-600">
        {petName ? `Choose a ${petType || "pet"} tone for ${petName}` : "Choose your reminder sound"}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {PRESETS.map((p) => (
          <div key={p.id} className={`rounded-2xl border p-3 ${tone?.id === p.id ? "border-gray-900" : "border-gray-200"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music2 className="h-4 w-4 text-rose-500" />
                <span className="text-sm font-medium">{p.name}</span>
              </div>
              <button
                onClick={() => playPreset(p.id)}
                className="rounded-lg px-2 py-1 text-xs text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
              >
                <Play className="mr-1 inline h-3 w-3" /> Preview
              </button>
            </div>
            <button
              onClick={() => onChange({ type: "preset", id: p.id, label: p.name })}
              className={`mt-3 w-full rounded-xl px-3 py-2 text-sm font-medium ${
                tone?.id === p.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Use
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-dashed border-gray-300 p-4">
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Upload className="h-4 w-4" />
            <span className="text-sm">Upload custom audio (mp3, wav)</span>
          </div>
          <input type="file" accept="audio/*" onChange={handleUpload} className="hidden" />
          <span className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white">Choose file</span>
        </label>
        {tone?.type === "custom" && (
          <div className="mt-3 flex items-center justify-between text-sm text-gray-700">
            <span className="truncate">{tone.label}</span>
            <button onClick={() => playFile(tone.src)} className="rounded-lg px-2 py-1 ring-1 ring-gray-300 hover:bg-gray-50">
              <Play className="mr-1 inline h-3 w-3" /> Preview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
