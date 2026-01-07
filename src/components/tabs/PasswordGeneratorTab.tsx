import React, { useMemo, useState } from "react";
import { generatePassword, PasswordOptions, estimateEntropyBits } from "../../lib/password";

export function PasswordGeneratorTab() {
  const [len, setLen] = useState(20);
  const [opts, setOpts] = useState<PasswordOptions>({
    lower: true,
    upper: true,
    digits: true,
    symbols: true,
    noSimilar: false,
    requireAllSelectedSets: true,
  });

  const password = useMemo(() => generatePassword(len, opts), [len, opts]);
  const entropy = useMemo(() => estimateEntropyBits(len, opts), [len, opts]);

  async function copy() {
    await navigator.clipboard.writeText(password);
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <h2 className="text-lg font-semibold">Passwortgenerator</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Lokal im Browser generiert. Keine Übertragung an Server.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-300">Länge</label>
              <div className="text-sm text-zinc-400">{len}</div>
            </div>
            <input
              type="range"
              min={8}
              max={64}
              value={len}
              onChange={(e) => setLen(Number(e.target.value))}
              className="mt-3 w-full"
            />

            <div className="mt-6 space-y-3">
              <Toggle
                label="Kleinbuchstaben"
                checked={opts.lower}
                onChange={(v) => setOpts((s) => ({ ...s, lower: v }))}
              />
              <Toggle
                label="Großbuchstaben"
                checked={opts.upper}
                onChange={(v) => setOpts((s) => ({ ...s, upper: v }))}
              />
              <Toggle
                label="Zahlen"
                checked={opts.digits}
                onChange={(v) => setOpts((s) => ({ ...s, digits: v }))}
              />
              <Toggle
                label="Sonderzeichen"
                checked={opts.symbols}
                onChange={(v) => setOpts((s) => ({ ...s, symbols: v }))}
              />
              <div className="pt-2" />
              <Toggle
                label="Keine ähnlichen Zeichen (O/0, l/1)"
                checked={opts.noSimilar}
                onChange={(v) => setOpts((s) => ({ ...s, noSimilar: v }))}
              />
              <Toggle
                label="Aus jedem aktivierten Zeichensatz mindestens 1 Zeichen"
                checked={opts.requireAllSelectedSets}
                onChange={(v) => setOpts((s) => ({ ...s, requireAllSelectedSets: v }))}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm text-zinc-400">Generiertes Passwort</div>
                <div className="mt-2 break-all rounded-xl border border-zinc-800 bg-zinc-900/30 p-3 font-mono text-base">
                  {password}
                </div>
                <div className="mt-2 text-xs text-zinc-500">
                  Geschätzte Entropie: ~{entropy.toFixed(0)} bits
                </div>
              </div>

              <button
                type="button"
                onClick={copy}
                className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm hover:bg-zinc-900/40"
              >
                Kopieren
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-3">
              <div className="text-sm font-medium">Hinweis</div>
              <div className="mt-1 text-sm text-zinc-400">
                Für maximale Robustheit: Länge ≥ 20, alle Zeichensätze aktiv, „keine ähnlichen Zeichen“
                optional.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span className="text-sm text-zinc-300">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4"
      />
    </label>
  );
}
