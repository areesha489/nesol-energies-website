interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "url" | "number" | "textarea";
  placeholder?: string;
  rows?: number;
}

export function Field({ label, value, onChange, type = "text", placeholder, rows = 3 }: FieldProps) {
  const baseClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20";

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={baseClass}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function SaveBar({
  saving,
  saved,
  onSave,
}: {
  saving: boolean;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-20 -mx-5 mt-6 border-t border-gray-200 bg-white/95 px-5 py-4 backdrop-blur-sm lg:-mx-8 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-gray-500">
          {saved ? "✓ Changes saved successfully" : "Remember to save your changes"}
        </p>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:scale-[1.02] transition-transform disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
