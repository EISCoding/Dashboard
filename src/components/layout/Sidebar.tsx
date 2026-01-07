import React from "react";

export type TabKey = "utilization" | "password" | "weather";

type Props = {
    collapsed: boolean;
    onToggle: () => void;
    activeTab: TabKey;
    onSelectTab: (tab: TabKey) => void;
};

type NavItemDef = {
    key: TabKey;
    label: string;
    icon: React.ReactNode;
};

export function Sidebar({ collapsed, onToggle, activeTab, onSelectTab }: Props) {
    const items: NavItemDef[] = [
        { key: "utilization", label: "Auslastung", icon: <IconBox>📊</IconBox> },
        { key: "password", label: "Passwortgenerator", icon: <IconBox>🔐</IconBox> },
        { key: "weather", label: "Wetter", icon: <IconBox>🌦️</IconBox> },
    ];

    return (
        <aside
            className={[
                "h-screen sticky top-0",
                "border-r border-zinc-800 bg-zinc-950 text-zinc-100",
                "transition-[width] duration-200 ease-out",
                "overflow-x-hidden", // wichtig: verhindert Text/Icons-Overflow im collapsed Zustand
                collapsed ? "w-16" : "w-64",
            ].join(" ")}
        >
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-3 border-b border-zinc-800">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="h-8 w-8 rounded-lg bg-zinc-800" />
                    <span
                        className={[
                            "text-sm font-semibold truncate transition-all duration-200",
                            collapsed ? "opacity-0 w-0 pointer-events-none" : "opacity-100 w-auto",
                        ].join(" ")}
                    >
            Dashboard
          </span>
                </div>

                <button
                    type="button"
                    onClick={onToggle}
                    className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-900/40"
                    aria-label={collapsed ? "Sidebar ausklappen" : "Sidebar einklappen"}
                    title={collapsed ? "Ausklappen" : "Einklappen"}
                >
                    {/* simpel; später Icon ersetzen */}
                    <span className="text-base leading-none">≡</span>
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-2 space-y-1">
                {items.map((it) => (
                    <NavItem
                        key={it.key}
                        collapsed={collapsed}
                        active={activeTab === it.key}
                        icon={it.icon}
                        label={it.label}
                        onClick={() => onSelectTab(it.key)}
                    />
                ))}
            </nav>

            {/* Footer (optional) */}
            <div className="mt-auto p-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/10 p-3">
                    <div className="text-xs text-zinc-500">Version</div>
                    <div
                        className={[
                            "text-sm text-zinc-200 transition-all duration-200",
                            collapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto",
                        ].join(" ")}
                    >
                        0.1.0
                    </div>
                </div>
            </div>
        </aside>
    );
}

function NavItem({
                     collapsed,
                     active,
                     icon,
                     label,
                     onClick,
                 }: {
    collapsed: boolean;
    active: boolean;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={collapsed ? label : undefined} // Tooltip im collapsed Zustand
            className={[
                "w-full flex items-center gap-3 rounded-xl h-11",
                "transition-colors",
                collapsed ? "justify-center px-2" : "justify-start px-3",
                active
                    ? "bg-zinc-900 border border-zinc-700"
                    : "border border-transparent hover:bg-zinc-900/50",
            ].join(" ")}
        >
      <span className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-zinc-900/70 border border-zinc-800">
        {icon}
      </span>

            {/* Label im collapsed Modus wirklich „wegnehmen“ (kein Click-/Hover-Glitch) */}
            <span
                className={[
                    "text-sm whitespace-nowrap text-left transition-all duration-200",
                    collapsed
                        ? "opacity-0 w-0 overflow-hidden pointer-events-none"
                        : "opacity-100 w-auto",
                ].join(" ")}
            >
        {label}
      </span>
        </button>
    );
}

function IconBox({ children }: { children: React.ReactNode }) {
    return <span className="text-base leading-none">{children}</span>;
}
