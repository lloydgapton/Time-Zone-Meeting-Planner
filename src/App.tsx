import { useState } from "react";
import CitySelector from "./components/CitySelector";
import CityClocks from "./components/CityClocks";
import BestWindow from "./components/BestWindow";
import TimeGrid from "./components/TimeGrid";
import { CITIES, MAX_CITIES } from "./data/cities";
import {
  buildDaySlots,
  findBestWindow,
  getLocalHour,
  isWorkingHour,
} from "./utils/time";
import type { City, WorkingHours } from "./types";

function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["lagos", "london"]);

  // Temporary fixed hours. Next phase turns this into state with a control.
  const hours: WorkingHours = { start: 9, end: 17 };

  const selectedCities: City[] = [];
  for (const id of selectedIds) {
    const city = CITIES.find((c) => c.id === id);
    if (city) {
      selectedCities.push(city);
    }
  }

  const availableCities = CITIES.filter((c) => !selectedIds.includes(c.id));
  const isFull = selectedIds.length >= MAX_CITIES;

  // NEW: derived data, recalculated on every render, never stored in state
  const slots = buildDaySlots();

  const overlapFlags = slots.map(
    (slot) =>
      selectedCities.length > 0 &&
      selectedCities.every((city) =>
        isWorkingHour(getLocalHour(slot, city.timeZone), hours.start, hours.end)
      )
  );

  const bestWindow = findBestWindow(overlapFlags);

  const addCity = (id: string) => {
    if (isFull || selectedIds.includes(id)) return;
    setSelectedIds([...selectedIds, id]);
  };

  const removeCity = (id: string) => {
    setSelectedIds(selectedIds.filter((existing) => existing !== id));
  };

  return (
    <main className="app">
      <h1>Time Zone Meeting Planner</h1>
      <p>Find a time that works for everyone.</p>
      <CitySelector
        availableCities={availableCities}
        isFull={isFull}
        onAdd={addCity}
      />
      <CityClocks cities={selectedCities} onRemove={removeCity} />
      <BestWindow
        bestWindow={bestWindow}
        cities={selectedCities}
        slots={slots}
      />
      <TimeGrid
        cities={selectedCities}
        slots={slots}
        hours={hours}
        overlapFlags={overlapFlags}
      />
    </main>
  );
}

export default App;