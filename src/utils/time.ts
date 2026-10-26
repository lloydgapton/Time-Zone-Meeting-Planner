import type{MeetingWindow} from "../types";

export function getLocalHour(date: Date, timeZone: string): number {
    const formatter = new Intl.DateTimeFormat("en-us", {
        timeZone,
        hour: "numeric",
        hourCycle: "h23",
});
    return Number(formatter.format(date));
}

export function isWorkingHour(
    hour: number,
    start: number,
    end: number
): boolean {
    return hour >= start && hour < end;
}

export function findBestWindow(flags: boolean[]): MeetingWindow | null{
    let best: MeetingWindow | null = null;
    let runStart = 0;
    let runLength = 0;

    for (let i = 0; i < flags.length; i++){
        if (flags[i]) {
            if (runLength === 0) {
                runStart =i;
            }
            runLength++;

            if (best === null || runLength > best.length){
                best ={start:runStart, length: runLength};
            }
        } else {
            runLength = 0;
        }
    }
    return best;
}

export function formatTime(date: Date, timeZone: string): string {
    return new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).format(date);
}

export function formatDay(date: Date, timeZone: string): string{
    return new Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "short",
         month: "short",
        day: "numeric",
    }).format(date);
}

export const HOUR_MS = 60 * 60 * 1000;

export function buildDaySlots(): Date[] {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const slots: Date[] = [];
  for (let i = 0; i < 24; i++) {
    slots.push(new Date(start.getTime() + i * HOUR_MS));
  }
  return slots;
}

export function formatHourMinute(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}