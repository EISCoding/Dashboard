import React, { useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { TabKey } from "../components/layout/TabNav";
import { UtilizationTab } from "../components/tabs/UtilizationTab";
import { PasswordGeneratorTab } from "../components/tabs/PasswordGeneratorTab";
import { WeatherTab } from "../components/tabs/WeatherTab";

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("utilization");
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      <div className="flex min-h-screen">
        <Sidebar
          active={activeTab}
          collapsed={isCollapsed}
          onChange={setActiveTab}
          onToggle={() => setIsCollapsed((prev) => !prev)}
        />
        <div className="flex-1">
          <Header
            title="Homelab Dashboard"
            subtitle="Monitoring • Tools • Widgets"
          />
          <main className="mx-auto w-full max-w-6xl px-6 pb-12 pt-8">
            {content}
          </main>
        </div>
      </div>
    </div>
  );
}
