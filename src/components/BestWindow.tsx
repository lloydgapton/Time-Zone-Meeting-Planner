import type { City, MeetingWindow } from "../types";
import { HOUR_MS, formatHourMinute } from "../utils/time";

type BestWindowProps = {
  bestWindow: MeetingWindow | null;
  cities: City[];
  slots: Date[];
};

function BestWindow({ bestWindow, cities, slots }: BestWindowProps) {
  if (cities.length === 0) return null;

  if (bestWindow === null) {
    return (
      <section className="best best-none" aria-live="polite">
        <h2>Best meeting window</h2>
        <p>
          There's no time today when everyone is within working hours. Try fewer
          cities or wider working hours.
        </p>
      </section>
    );
  }

  const startTime = slots[bestWindow.start];
  const endTime = new Date(startTime.getTime() + bestWindow.length * HOUR_MS);

  return (
    <section className="best" aria-live="polite">
      <h2>Best meeting window</h2>
      <p>
        {bestWindow.length} {bestWindow.length === 1 ? "hour" : "hours"} when
        everyone is working:
      </p>
      <ul className="best-list">
        {cities.map((city) => (
          <li key={city.id}>
            <strong>{city.name}</strong>:{" "}
            {formatHourMinute(startTime, city.timeZone)} to{" "}
            {formatHourMinute(endTime, city.timeZone)}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BestWindow;