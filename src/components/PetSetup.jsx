import { useState } from "react";
import { Camera, Cat, Dog, Bird } from "lucide-react";

const PETS = [
  { id: "cat", label: "Cat", icon: Cat, color: "text-rose-500" },
  { id: "dog", label: "Dog", icon: Dog, color: "text-amber-600" },
  { id: "bird", label: "Bird", icon: Bird, color: "text-emerald-600" },
];

const THEMES = [
  { id: "pastel", name: "Soft Pastel", gradient: "from-rose-100 to-sky-100" },
  { id: "watercolor", name: "Vibrant Watercolor", gradient: "from-violet-200 to-amber-200" },
  { id: "earthy", name: "Earthy Minimal", gradient: "from-amber-100 to-emerald-100" },
];

export default function PetSetup({ pet, onChange }) {
  const [preview, setPreview] = useState(pet?.photo || "");

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result?.toString() || "";
      setPreview(url);
      onChange({ ...pet, photo: url });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h2 className="mb-3 text-lg font-semibold text-gray-800">Pet setup</h2>

      <div className="grid grid-cols-3 gap-3">
        {PETS.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => onChange({ ...pet, type: id })}
            className={`flex items-center justify-center gap-2 rounded-2xl border p-3 transition ${
              pet?.type === id ? "border-gray-800 bg-gray-900 text-white" : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Icon className={`${pet?.type === id ? "text-white" : color}`} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="text-sm text-gray-600">Pet name</label>
          <input
            type="text"
            value={pet?.name || ""}
            onChange={(e) => onChange({ ...pet, name: e.target.value })}
            placeholder="e.g., Luna or Rocky"
            className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Upload photo</label>
          <div className="mt-1 flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50">
              <Camera className="h-4 w-4" />
              <span className="text-sm">Choose file</span>
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>
            {preview ? (
              <img src={preview} alt="Pet" className="h-10 w-10 rounded-xl object-cover" />
            ) : (
              <div className="h-10 w-10 rounded-xl bg-gray-100" />
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-sm text-gray-600">Theme</p>
        <div className="grid grid-cols-3 gap-3">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ ...pet, theme: t.id })}
              className={`h-20 rounded-2xl bg-gradient-to-br ${t.gradient} ring-2 transition ${
                pet?.theme === t.id ? "ring-gray-900" : "ring-transparent hover:ring-gray-300"
              }`}
              aria-label={t.name}
              title={t.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
