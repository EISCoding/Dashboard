import React, { useMemo } from "react";
import { StatCard } from "../cards/StatCard";

type HostRow = {
  name: string;
  status: "online" | "offline";
  cpu: number; // %
  ram: number; // %
  disk: number; // %
  uptime: string;
};

export function UtilizationTab() {
  // Placeholder-Daten (später aus Prometheus/API ersetzen)
  const hosts: HostRow[] = useMemo(
    () => [
      { name: "pve-01", status: "online", cpu: 23, ram: 61, disk: 72, uptime: "12d 04h" },
      { name: "pve-02", status: "online", cpu: 35, ram: 48, disk: 64, uptime: "9d 18h" },
      { name: "nas-01", status: "offline", cpu: 0, ram: 0, disk: 0, uptime: "-" },
    ],
    []
  );

  const onlineCount = hosts.filter((h) => h.status === "online").length;

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Online" value={`${onlineCount}/${hosts.length}`} sub="Hosts erreichbar" />
        <StatCard title="CPU Ø" value="—" sub="Platzhalter (gesamt)" />
        <StatCard title="RAM Ø" value="—" sub="Platzhalter (gesamt)" />
        <StatCard title="Storage kritisch" value="—" sub="> 85% Nutzung" />
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Host-Übersicht</h2>
          <div className="text-sm text-zinc-400">Klick: später Drilldown/Drawer</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="text-zinc-400">
              <tr className="border-b border-zinc-800">
                <th className="py-2 pr-4 font-medium">Host</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">CPU</th>
                <th className="py-2 pr-4 font-medium">RAM</th>
                <th className="py-2 pr-4 font-medium">Disk</th>
                <th className="py-2 pr-4 font-medium">Uptime</th>
                <th className="py-2 pr-2 font-medium">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {hosts.map((h) => (
                <tr key={h.name} className="border-b border-zinc-900 hover:bg-zinc-900/30">
                  <td className="py-3 pr-4 font-medium">{h.name}</td>
                  <td className="py-3 pr-4">
                    <StatusDot status={h.status} />
                  </td>
                  <td className="py-3 pr-4">{formatPct(h.cpu)}</td>
                  <td className="py-3 pr-4">{formatPct(h.ram)}</td>
                  <td className="py-3 pr-4">{formatPct(h.disk)}</td>
                  <td className="py-3 pr-4 text-zinc-300">{h.uptime}</td>
                  <td className="py-3 pr-2">
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1 hover:bg-zinc-900/40">
                        Ping
                      </button>
                      <button className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1 hover:bg-zinc-900/40">
                        SSH
                      </button>
                      <button className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1 hover:bg-zinc-900/40">
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {hosts.length === 0 ? (
                <tr>
                  <td className="py-6 text-zinc-500" colSpan={7}>
                    Keine Hosts vorhanden.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function StatusDot({ status }: { status: "online" | "offline" }) {
  const cls =
    status === "online"
      ? "bg-emerald-400/80 ring-emerald-700/40"
      : "bg-red-400/80 ring-red-700/40";
  const text = status === "online" ? "Online" : "Offline";

  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ring-4 ${cls}`} />
      <span className="text-zinc-300">{text}</span>
    </span>
  );
}

function formatPct(v: number) {
  if (v <= 0) return "—";
  return `${v.toFixed(0)}%`;
}
