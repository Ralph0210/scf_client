import React, { useState, useEffect } from "react";
import "./DisplaySelection.css";
import { MultiSelect } from "react-multi-select-component";
import { Clear } from "@mui/icons-material";

const DisplaySelection = ({
  uniqueValues,
  setUniqueValues,
  data,
  setData,
  dataSelections,
  setDataSelections,
  toggleSecondaryDistribution,
  secondaryUniqueValues,
  setSecondaryUniqueValues,
}) => {
  const [displayContainerKey, setDisplayContainerKey] = useState(0);

  const handleDataChange = (e, index) => {
    const updatedValue = [...dataSelections];
    updatedValue[index].selectedDisplay = e;
    setDataSelections(updatedValue);
    console.log("display handle", updatedValue);
  };

  const handleSecondaryDataChange = (e, index) => {
    const updatedValue = [...dataSelections];
    updatedValue[index].secondarySelectedDisplay = e;
    setDataSelections(updatedValue);
    console.log("display handle", updatedValue);
  };

  const handleDeletion = (index) => {
    const updatedElements = dataSelections.filter((_, i) => i !== index);
    setDataSelections(updatedElements);
    // console.log(updatedElements)

    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    // console.log("data deletion", updatedData)

    const updatedUniqueValues = uniqueValues.filter((_, i) => i !== index);
    setUniqueValues(updatedUniqueValues);
  };
  // // Use a useEffect to listen for changes in dataSelection.selectedDistribution
  // useEffect(() => {
  //   // Handle any logic you want to perform when dataSelection.selectedDistribution changes.
  //   // This will be triggered whenever dataSelection.selectedDistribution changes.

  //   // Increment the key to trigger a re-render of the display container
  //   setDisplayContainerKey((prevKey) => prevKey + 1);
  // }, [dataSelections.map((data) => data.selectedDistribution)]);

  return (
    <div className="display_container" 
    // key={displayContainerKey}
    >
      <label htmlFor="Display">Display</label>

      {dataSelections.map((data, index) => (
        <div key={index} className="display_container_components">
          <MultiSelect
            className="multi-select"
            options={uniqueValues[index]}
            value={[...data.selectedDisplay]}
            onChange={(e) => handleDataChange(e, index)}
            // shouldToggleOnHover={true}
            labelledBy="Select"
            overrideStrings={{ allItemsAreSelected: "All" }}
            disableSearch={true}
            ClearSelectedIcon={null}
          />
          {/* <div
            className="deletion_container"
            onClick={() => handleDeletion(index)}
          >
            <Clear />
          </div> */}
        </div>
      ))}

      {toggleSecondaryDistribution && (
        <div>
        {dataSelections.map((data, index) => (
          <div key={index} className="secondary_display_container_components">
            <MultiSelect
              className="multi-select"
              options={secondaryUniqueValues[index]}
              value={[...data.secondarySelectedDisplay]}
              onChange={(e) => handleSecondaryDataChange(e, index)}
              // shouldToggleOnHover={true}
              labelledBy="Select"
              overrideStrings={{ allItemsAreSelected: "All" }}
              disableSearch={true}
              ClearSelectedIcon={null}
            />
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default DisplaySelection;
