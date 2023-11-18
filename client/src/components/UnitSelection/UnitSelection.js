import React, {useState, useEffect, useRef} from "react";
import "./UnitSelection.css";
import InfoIcon from '@mui/icons-material/Info';
import { Info } from "@mui/icons-material";

const UnitSelection = ({
  selectedUnit,
  setSelectedUnit,
  setUnitLabel
}) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };


  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
    setUnitLabel("dollars")
  };

  const handleUnitChangeLog = (event) => {
    setSelectedUnit(event.target.value);
    setUnitLabel("log dollars")
  };

  return (
    <div className="unit">
      <label htmlFor="units">Unit</label>
      <div className="units" id="unit">
        <div className="units_container">
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
        </div>
<div className="units_container">
        <label>
          <input
            type="radio"
            value="Log Mean"
            checked={selectedUnit === "Log Mean"}
            onChange={handleUnitChangeLog}
          />
          Mean(Log$)
          <div
            className="info-icon-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <InfoIcon style={{ fontSize: 'small', fill: '#7C9CBF' }} />
            {isHovered && (
              <div className="popup">
                {/* Popup content */}
                Natural Log Mean
              </div>
            )}
          </div>
        </label>

        <label>
          <input
            type="radio"
            value="Log Median"
            checked={selectedUnit === "Log Median"}
            onChange={handleUnitChangeLog}
          />
          Median(Log$)
          <div
            className="info-icon-container"
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
          >
            <InfoIcon style={{ fontSize: 'small', fill: '#7C9CBF' }} />
            {isHovered2 && (
              <div className="popup">
                {/* Popup content */}
                Natural Log each weigthted data entry and calculate the median
              </div>
            )}
          </div>
        </label>
        </div>
      </div>
    </div>
  );
};

export default UnitSelection;
