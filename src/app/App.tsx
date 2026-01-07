import React, { useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { TabNav, TabKey } from "../components/layout/TabNav";
import { UtilizationTab } from "../components/tabs/UtilizationTab";
import { PasswordGeneratorTab } from "../components/tabs/PasswordGeneratorTab";
import { WeatherTab } from "../components/tabs/WeatherTab";

export function App() {
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
      <Header
        title="Homelab Dashboard"
        subtitle="Monitoring • Tools • Widgets"
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-12">
        <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-zinc-800 bg-zinc-950/85 px-4 backdrop-blur">
          <TabNav active={activeTab} onChange={setActiveTab} />
        </div>

        {content}
      </main>
    </div>
  );
}
