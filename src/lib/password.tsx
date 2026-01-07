export type PasswordOptions = {
  lower: boolean;
  upper: boolean;
  digits: boolean;
  symbols: boolean;
  noSimilar: boolean;
  requireAllSelectedSets: boolean;
};

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.?/|~";

const SIMILAR = new Set(["O", "0", "o", "I", "l", "1"]);

function pickChar(set: string) {
  const idx = crypto.getRandomValues(new Uint32Array(1))[0] % set.length;
  return set[idx];
}

function shuffle(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const r = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [arr[i], arr[r]] = [arr[r], arr[i]];
  }
  return arr;
}

export function generatePassword(length: number, opts: PasswordOptions) {
  const sets: string[] = [];
  if (opts.lower) sets.push(LOWER);
  if (opts.upper) sets.push(UPPER);
  if (opts.digits) sets.push(DIGITS);
  if (opts.symbols) sets.push(SYMBOLS);

  const effectiveSets = sets.length ? sets : [LOWER];

  // Gesamtes Alphabet bauen
  let alphabet = effectiveSets.join("");
  if (opts.noSimilar) {
    alphabet = alphabet
      .split("")
      .filter((c) => !SIMILAR.has(c))
      .join("");
  }
  if (!alphabet.length) alphabet = LOWER; // Fallback

  const out: string[] = [];

  // Optional: aus jedem aktivierten Zeichensatz mindestens 1 Zeichen
  if (opts.requireAllSelectedSets) {
    for (const s of effectiveSets) {
      const filtered = opts.noSimilar
        ? s.split("").filter((c) => !SIMILAR.has(c)).join("")
        : s;
      out.push(pickChar(filtered.length ? filtered : alphabet));
    }
  }

  while (out.length < length) {
    out.push(pickChar(alphabet));
  }

  return shuffle(out).slice(0, length).join("");
}

export function estimateEntropyBits(length: number, opts: PasswordOptions) {
  // grobe Näherung: log2(|alphabet|^length) = length * log2(|alphabet|)
  const sizes = [
    opts.lower ? LOWER.length : 0,
    opts.upper ? UPPER.length : 0,
    opts.digits ? DIGITS.length : 0,
    opts.symbols ? SYMBOLS.length : 0,
  ];
  let alphabetSize = sizes.reduce((a, b) => a + b, 0);
  if (alphabetSize === 0) alphabetSize = LOWER.length;

  if (opts.noSimilar) {
    // sehr grobe Korrektur
    alphabetSize = Math.max(10, alphabetSize - 6);
  }

  return length * Math.log2(alphabetSize);
}
