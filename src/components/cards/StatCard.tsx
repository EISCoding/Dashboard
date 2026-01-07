import React from "react";

export function StatCard(props: {
  title: string;
  value: string;
  sub?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-zinc-400">{props.title}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">{props.value}</div>
          {props.sub ? <div className="mt-1 text-xs text-zinc-500">{props.sub}</div> : null}
        </div>
        {props.right ? <div className="pt-1">{props.right}</div> : null}
      </div>
    </div>
  );
}
