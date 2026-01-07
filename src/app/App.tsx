import React, { useMemo, useState } from "react";
import { Sidebar, TabKey } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { UtilizationTab } from "../components/tabs/UtilizationTab";
import { PasswordGeneratorTab } from "../components/tabs/PasswordGeneratorTab";
import { WeatherTab } from "../components/tabs/WeatherTab";

export function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("utilization");

  const content = useMemo(() => {
    switch (activeTab) {
      case "utilization":
        return <UtilizationTab />;
      case "password":
        return <PasswordGeneratorTab />;
      case "weather":
        return <WeatherTab />;
      default:
        return null;
    }
  }, [activeTab]);

  return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="flex">
          <Sidebar
              collapsed={collapsed}
              onToggle={() => setCollapsed((v) => !v)}
              activeTab={activeTab}
              onSelectTab={setActiveTab}
          />

          {/* Wichtig: main als flex-1, ohne harte margins → verhindert „buggy“ Layout beim Collapse */}
          <div className="flex min-w-0 flex-1 flex-col">
            <Header title="Homelab Dashboard" subtitle="Monitoring • Tools • Widgets" />

            <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6">
              {content}
            </main>
          </div>
        </div>
      </div>
  );
}
