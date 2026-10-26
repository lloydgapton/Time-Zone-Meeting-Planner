import { useState } from "react";
import CitySelector from "./components/CitySelector";
import CityClocks from "./components/CityClocks";
import { CITIES, MAX_CITIES } from "./data/cities";
import type { City } from "./types";

function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["lagos", "london"]);

  const selectedCities: City[] = [];
  for (const id of selectedIds) {
    const city = CITIES.find((c) => c.id === id);
    if (city) {
      selectedCities.push(city);
    }
  }

  const availableCities = CITIES.filter((c) => !selectedIds.includes(c.id));
  const isFull = selectedIds.length >= MAX_CITIES;

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
    </main>
  );
}

export default App;