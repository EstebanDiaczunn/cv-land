import esStrings from "../content/i18n/ui-es.json";
import enStrings from "../content/i18n/ui-en.json";

export type Lang = "es" | "en";

const dictionaries = {
  es: esStrings as Record<string, string>,
  en: enStrings as Record<string, string>,
};

export function useTranslations(lang: Lang) {
  const dict = dictionaries[lang];
  return (key: string): string => dict[key] ?? key;
}

export function pickLocalized<T>(
  value: { es: T; en: T },
  lang: Lang
): T {
  return value[lang];
}

// Filter content collection entries by `-es` / `-en` id suffix.
// Body MDX lives in parallel files (qtech-es.md / qtech-en.md) — Astro 6's
// glob loader strips dots from filenames when building the id, so a dash
// separator keeps the suffix intact (`qtech-es`, `qtech-en`).
export function filterByLang<T extends { id: string }>(
  entries: T[],
  lang: Lang
): T[] {
  return entries.filter((e) => e.id.endsWith(`-${lang}`));
}

const monthsEs = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];
const monthsEn = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export function formatDate(iso: string | null, lang: Lang): string {
  if (!iso) return lang === "es" ? "PRESENTE" : "PRESENT";
  if (iso === "TODO") return "TODO";
  const [year, month] = iso.split("-");
  if (!month) return year;
  const idx = parseInt(month, 10) - 1;
  if (Number.isNaN(idx) || idx < 0 || idx > 11) return iso;
  const months = lang === "es" ? monthsEs : monthsEn;
  return `${months[idx]} ${year}`;
}

export function formatDateRange(
  start: string,
  end: string | null,
  lang: Lang
): string {
  return `${formatDate(start, lang)} → ${formatDate(end, lang)}`;
}
