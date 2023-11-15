import React from "react";
import "./UnitSelection.css";

const UnitSelection = ({
  selectedUnit,
  setSelectedUnit,
}) => {
  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  return (
    <div className="unit">
      <label htmlFor="units">Unit</label>
      <div className="units" id="unit">
        <label>
          <input
            type="radio"
            value="Mean"
            checked={selectedUnit === "Mean"}
            onChange={handleUnitChange}
          />
          Mean($)
        </label>

        <label>
          <input
            type="radio"
            value="Median"
            checked={selectedUnit === "Median"}
            onChange={handleUnitChange}
          />
          Median($)
        </label>

        <label>
          <input
            type="radio"
            value="Log Mean"
            checked={selectedUnit === "Log Mean"}
            onChange={handleUnitChange}
          />
          Mean(Log$)
        </label>

        <label>
          <input
            type="radio"
            value="Log Median"
            checked={selectedUnit === "Log Median"}
            onChange={handleUnitChange}
          />
          Median(Log$)
        </label>
      </div>
    </div>
  );
};

export default UnitSelection;
