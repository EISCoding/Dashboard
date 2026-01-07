import React, { useEffect, useState } from "react";

type Props = {
  title: string;
  subtitle?: string;
};

export function Header({ title, subtitle }: Props) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <StatusPill label="Monitoring" state="ok" />
          <div className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm text-zinc-300">
            {now.toLocaleString("de-DE", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

function StatusPill({ label, state }: { label: string; state: "ok" | "warn" | "down" }) {
  const map = {
    ok: "border-emerald-900/60 bg-emerald-950/40 text-emerald-200",
    warn: "border-amber-900/60 bg-amber-950/40 text-amber-200",
    down: "border-red-900/60 bg-red-950/40 text-red-200",
  } as const;

  const text = state === "ok" ? "OK" : state === "warn" ? "WARN" : "DOWN";

  return (
    <div className={`rounded-full border px-3 py-1 text-sm ${map[state]}`}>
      <span className="mr-2 text-zinc-300">{label}:</span>
      <span className="font-medium">{text}</span>
    </div>
  );
}
