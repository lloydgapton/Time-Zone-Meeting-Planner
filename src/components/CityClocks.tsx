import type { City } from "../types";
import { useNow } from "../hooks/useNow";
import { formatDay, formatTime } from "../utils/time";

type CityClocksProps = {
  cities: City[];
  onRemove: (id: string) => void;
};

function CityClocks({ cities, onRemove }: CityClocksProps) {
  const now = useNow();

  if (cities.length === 0) {
    return (
      <p className="empty">No cities selected yet. Add one above to get started.</p>
    );
  }

  return (
    <ul className="clocks">
      {cities.map((city) => (
        <li key={city.id} className="clock">
          <div>
            <h2 className="clock-name">{city.name}</h2>
            <p className="clock-day">{formatDay(now, city.timeZone)}</p>
          </div>
          <p className="clock-time">{formatTime(now, city.timeZone)}</p>
          <button
            type="button"
            onClick={() => onRemove(city.id)}
            aria-label={`Remove ${city.name}`}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CityClocks;