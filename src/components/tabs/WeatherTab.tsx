import React, { useMemo, useState } from "react";

type Location = { key: string; label: string };

export function WeatherTab() {
  const locations: Location[] = useMemo(
    () => [
      { key: "freyung", label: "Freyung" },
      { key: "home", label: "Zuhause" },
      { key: "dc", label: "Rechenzentrum" },
    ],
    []
  );

  const [loc, setLoc] = useState(locations[0]?.key ?? "freyung");

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Wetter</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Platzhalter-UI. Später via Open-Meteo oder DWD/anderer Quelle anbinden.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-zinc-400">Standort</label>
            <select
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
            >
              {locations.map((l) => (
                <option key={l.key} value={l.key}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 lg:col-span-1">
            <div className="text-sm text-zinc-400">Aktuell</div>
            <div className="mt-2 text-4xl font-semibold">—°C</div>
            <div className="mt-2 text-sm text-zinc-400">
              Gefühlte Temp.: —°C • Luftfeuchte: —% • Wind: — km/h
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 lg:col-span-2">
            <div className="text-sm text-zinc-400">24 Stunden (stündlich)</div>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-3">
                  <div className="text-xs text-zinc-500">—:—</div>
                  <div className="mt-1 text-lg font-medium">—°</div>
                  <div className="mt-1 text-xs text-zinc-500">—</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="text-sm text-zinc-400">7 Tage</div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-3">
                <div className="text-sm font-medium">Tag {i + 1}</div>
                <div className="mt-1 text-sm text-zinc-400">Min/Max: — / — °C</div>
                <div className="mt-1 text-xs text-zinc-500">—</div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-xs text-zinc-500">
            Ausgewählt: <span className="text-zinc-300">{loc}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
