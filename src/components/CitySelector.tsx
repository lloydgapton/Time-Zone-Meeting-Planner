import {useState} from "react";
import type {City} from "../types";
import {MAX_CITIES} from "../data/cities";

type CitySelectorProps = {
    availableCities: City[];
    isFull: boolean;
    onAdd: (id: string) => void;
};

function CitySelector({availableCities, isFull, onAdd}: CitySelectorProps) {
    const [choice, setChoice] = useState("");

    const handleAdd = () => {
        if (choice === "") return;
        onAdd(choice);
        setChoice("");
    };

    return(
        <div className="selector">
            <label htmlFor ="city-select">Add a city</label>
            <div className="selector-row">
                <select
                    id="city-select"
                    value={choice}
                    onChange={(e) => setChoice(e.target.value)}
                >
                    <option value="">Choose a city</option>
                    {availableCities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={isFull || choice === ""}
                >
                    Add
                </button>
            </div>
            {isFull && (
                <p className="hint">
                    Maximum of {MAX_CITIES} cities reached. Remove a city to add another.   
                </p>
            )}
        </div>
    );
}

export default CitySelector;