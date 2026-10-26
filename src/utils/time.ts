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