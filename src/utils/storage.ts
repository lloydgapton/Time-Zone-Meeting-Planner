import { CITIES, MAX_CITIES } from "../data/cities";
import type { WorkingHours } from "../types";

const CITIES_KEY = "tz-planner:cities";
const HOURS_KEY = "tz-planner:hours";

export const DEFAULT_CITY_IDS: string[] = ["lagos", "london"];
export const DEFAULT_HOURS: WorkingHours = { start: 9, end: 17 };

export function loadCityIds(): string[] {
  try {
    const raw = localStorage.getItem(CITIES_KEY);
    if (raw === null) return DEFAULT_CITY_IDS;

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_CITY_IDS;

    const known = parsed.filter(
      (id) => typeof id === "string" && CITIES.some((city) => city.id === id)
    );
    return [...new Set<string>(known)].slice(0, MAX_CITIES);
  } catch {
    return DEFAULT_CITY_IDS;
  }
}

export function loadHours(): WorkingHours {
  try {
    const raw = localStorage.getItem(HOURS_KEY);
    if (raw === null) return DEFAULT_HOURS;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === "object" && parsed !== null) {
      const { start, end } = parsed as Partial<WorkingHours>;
      if (
        typeof start === "number" &&
        typeof end === "number" &&
        Number.isInteger(start) &&
        Number.isInteger(end) &&
        start >= 0 &&
        end <= 24 &&
        start < end
      ) {
        return { start, end };
      }
    }
    return DEFAULT_HOURS;
  } catch {
    return DEFAULT_HOURS;
  }
}

export function saveCityIds(ids: string[]): void {
  try {
    localStorage.setItem(CITIES_KEY, JSON.stringify(ids));
  } catch {
    // Storage can be full or blocked (private mode). The app still works.
  }
}

export function saveHours(hours: WorkingHours): void {
  try {
    localStorage.setItem(HOURS_KEY, JSON.stringify(hours));
  } catch {
    // Same as above: failing to save is not worth crashing the app.
  }
}