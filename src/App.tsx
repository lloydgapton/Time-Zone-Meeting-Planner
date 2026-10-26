import { useEffect, useState } from "react";
import CitySelector from "./components/CitySelector";
import HoursControl from "./components/HoursControl";
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
import {
  loadCityIds,
  loadHours,
  saveCityIds,
  saveHours,
} from "./utils/storage";
import type { City, WorkingHours } from "./types";

function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>(loadCityIds);
  const [hours, setHours] = useState<WorkingHours>(loadHours);

  useEffect(() => {
    saveCityIds(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    saveHours(hours);
  }, [hours]);

  const selectedCities: City[] = [];
  for (const id of selectedIds) {
    const city = CITIES.find((c) => c.id === id);
    if (city) {
      selectedCities.push(city);
    }
  }

  const availableCities = CITIES.filter((c) => !selectedIds.includes(c.id));
  const isFull = selectedIds.length >= MAX_CITIES;

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
      <div className="controls">
        <CitySelector
          availableCities={availableCities}
          isFull={isFull}
          onAdd={addCity}
        />
        <HoursControl hours={hours} onChange={setHours} />
      </div>
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