import type { City, WorkingHours } from "../types";
import { getLocalHour, isWorkingHour } from "../utils/time";

type Status = "overlap" | "working" | "night";

const STATUS_LABELS = {
  overlap: "everyone is working",
  working: "working hours",
  night: "outside working hours",
};

function getStatus(isOverlap: boolean, isWorking: boolean): Status {
  if (isOverlap) return "overlap";
  if (isWorking) return "working";
  return "night";
}

type TimeGridProps = {
  cities: City[];
  slots: Date[];
  hours: WorkingHours;
  overlapFlags: boolean[];
};

function TimeGrid({ cities, slots, hours, overlapFlags }: TimeGridProps) {
  if (cities.length === 0) return null;

  const yourZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <section className="grid-section" aria-labelledby="grid-title">
      <h2 id="grid-title">Today's overlap</h2>
      <p className="hint">
        Each column is the same moment in time. The top row shows your time (
        {yourZone}). Every other row shows that city's local hour.
      </p>

      <ul className="legend">
        <li>
          <span className="swatch swatch-working" /> Working hours
        </li>
        <li>
          <span className="swatch swatch-night" /> Outside working hours
        </li>
        <li>
          <span className="swatch swatch-overlap" /> Everyone is working
        </li>
      </ul>

      <div
        className="grid-scroll"
        tabIndex={0}
        role="region"
        aria-labelledby="grid-title"
        >
        <table className="grid">
          <thead>
            <tr>
              <th scope="col" className="grid-corner">
                City
              </th>
              {slots.map((slot) => (
                <th key={slot.getTime()} scope="col" className="grid-hour">
                  {slot.getHours()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city.id}>
                <th scope="row" className="grid-city">
                  {city.name}
                </th>
                {slots.map((slot, i) => {
                  const hour = getLocalHour(slot, city.timeZone);
                  const working = isWorkingHour(hour, hours.start, hours.end);
                  const status = getStatus(overlapFlags[i], working);
                  const description = `${city.name} ${hour}:00, ${STATUS_LABELS[status]}`;

                  return (
                    <td
                      key={slot.getTime()}
                      className={`cell-${status}`}
                      title={description}
                      aria-label={description}
                    >
                      {hour}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TimeGrid;