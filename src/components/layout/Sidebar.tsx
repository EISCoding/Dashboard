import React from "react";
import { TabKey } from "./TabNav";

type SidebarItem = {
  key: TabKey;
  label: string;
  description: string;
  icon: string;
};

const items: SidebarItem[] = [
  {
    key: "utilization",
    label: "Auslastung",
    description: "CPU, RAM & Storage",
    icon: "bx bx-pulse",
  },
  {
    key: "password",
    label: "Passwort",
    description: "Generator & Vault",
    icon: "bx bx-key",
  },
  {
    key: "weather",
    label: "Wetter",
    description: "Aktuell & Forecast",
    icon: "bx bx-cloud",
  },
];

type Props = {
  active: TabKey;
  collapsed: boolean;
  onChange: (tab: TabKey) => void;
  onToggle: () => void;
};

export function Sidebar({ active, collapsed, onChange, onToggle }: Props) {
  return (
    <aside
      className={[
        "flex h-screen flex-col border-r border-zinc-800 bg-zinc-950/95 text-zinc-200 shadow-[inset_-1px_0_0_0_rgba(39,39,42,0.4)]",
        "transition-[width] duration-300 ease-out",
        collapsed ? "w-20" : "w-64",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-between gap-3 border-b border-zinc-800 px-4 py-5",
          collapsed ? "flex-col" : "flex-row",
        ].join(" ")}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-xl text-emerald-300 shadow-lg shadow-emerald-500/10">
            <i className="bx bx-grid-alt" aria-hidden="true" />
          </span>
          <div
            className={[
              "transition-all duration-300",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
            ].join(" ")}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Homelab
            </p>
            <p className="text-lg font-semibold text-zinc-50">Dashboard</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:border-zinc-700 hover:text-zinc-100"
          aria-label={collapsed ? "Sidebar ausklappen" : "Sidebar einklappen"}
        >
          <i className={collapsed ? "bx bx-chevron-right" : "bx bx-chevron-left"} />
        </button>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-5">
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChange(item.key)}
              className={[
                "group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition",
                collapsed ? "justify-center" : "justify-start",
                isActive
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.15)]"
                  : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/50",
              ].join(" ")}
              aria-current={isActive ? "page" : undefined}
              title={item.description}
            >
              <span
                className={[
                  "flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition",
                  isActive
                    ? "bg-emerald-500/20 text-emerald-200"
                    : "bg-zinc-900 text-zinc-300 group-hover:text-zinc-100",
                ].join(" ")}
              >
                <i className={item.icon} aria-hidden="true" />
              </span>
              <span
                className={[
                  "flex flex-col overflow-hidden transition-all duration-300",
                  collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
                ].join(" ")}
              >
                <span className="text-sm font-semibold text-zinc-100">
                  {item.label}
                </span>
                <span className="text-xs text-zinc-400">{item.description}</span>
              </span>
            </button>
          );
        })}
      </nav>

      <div
        className={[
          "border-t border-zinc-800 px-4 py-4 text-xs text-zinc-500 transition-all duration-300",
          collapsed ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        Quick access · Status OK
      </div>
    </aside>
  );
}
