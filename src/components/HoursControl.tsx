import { useState } from "react";
import type { ChangeEvent } from "react";
import type { WorkingHours } from "../types";

type HoursControlProps = {
  hours: WorkingHours;
  onChange: (hours: WorkingHours) => void;
};

const START_OPTIONS = Array.from({ length: 24 }, (_, i) => i);
const END_OPTIONS = Array.from({ length: 24 }, (_, i) => i + 1);

function formatHour(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

function HoursControl({ hours, onChange }: HoursControlProps) {
  const [error, setError] = useState("");

  const handleStart = (e: ChangeEvent<HTMLSelectElement>) => {
    const start = Number(e.target.value);
    if (start >= hours.end) {
      setError("Start time must be earlier than end time.");
      return;
    }
    setError("");
    onChange({ start, end: hours.end });
  };

  const handleEnd = (e: ChangeEvent<HTMLSelectElement>) => {
    const end = Number(e.target.value);
    if (end <= hours.start) {
      setError("End time must be later than start time.");
      return;
    }
    setError("");
    onChange({ start: hours.start, end });
  };

  return (
    <div className="hours">
      <h2>Working hours</h2>
      <p className="hint">Applied to every city, in that city's local time.</p>
      <div className="hours-row">
        <div className="hours-field">
          <label htmlFor="hours-start">Start</label>
          <select id="hours-start" value={hours.start} onChange={handleStart}>
            {START_OPTIONS.map((hour) => (
              <option key={hour} value={hour}>
                {formatHour(hour)}
              </option>
            ))}
          </select>
        </div>
        <div className="hours-field">
          <label htmlFor="hours-end">End</label>
          <select id="hours-end" value={hours.end} onChange={handleEnd}>
            {END_OPTIONS.map((hour) => (
              <option key={hour} value={hour}>
                {formatHour(hour)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error !== "" && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default HoursControl;