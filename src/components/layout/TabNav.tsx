import React from "react";

export type TabKey = "utilization" | "password" | "weather";

type Props = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
};

const tabs: Array<{ key: TabKey; label: string; hint: string }> = [
  { key: "utilization", label: "Auslastung", hint: "CPU, RAM, Storage, Status" },
  { key: "password", label: "Passwortgenerator", hint: "Sicher, flexibel, kopierbar" },
  { key: "weather", label: "Wetter", hint: "Aktuell, 24h, 7 Tage" },
];

export function TabNav({ active, onChange }: Props) {
  return (
    <nav className="py-3">
      <ul className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <li key={t.key}>
              <button
                type="button"
                onClick={() => onChange(t.key)}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition",
                  isActive
                    ? "border-zinc-600 bg-zinc-900 text-zinc-50"
                    : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/40",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
                title={t.hint}
              >
                {t.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
