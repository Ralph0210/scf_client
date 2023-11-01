import React from "react";
import "./DistributionSelection.css";
import { distinctValues } from "../api";
import options from "../../newVar.json";

const DistributionSelection = ({
  dataSelections,
  setDataSelections,
  setUniqueValues,
}) => {
  const handleDataChange = (e, index) => {
    const selectedDistribution = e.target.value;
    const selectedDistributionName = e.target.options[e.target.selectedIndex].getAttribute('name'); 
    const updatedValue = [...dataSelections];
    if (e.target.value === "None") {
      updatedValue[index].selectedDistribution = selectedDistribution;
      updatedValue[index].selectedDisplay = [
        {
          label: "None",
          value: "None",
        },
      ];
    } else {
      updatedValue[index].selectedDistribution = selectedDistribution;
      updatedValue[index].selectedDistributionName = selectedDistributionName;
      updatedValue[index].selectedDisplay = [];
      console.log(selectedDistribution, selectedDistributionName)
      fetchDistinctValues(updatedValue[index], index);
    }
    setDataSelections(updatedValue);
    console.log("none selection", updatedValue);
  };

  const fetchDistinctValues = async (dataSelection, index) => {
    try {
      const apiParams = {
        selectedDistribution: dataSelection.selectedDistribution,
      };

      const retrievedData = await distinctValues(
        apiParams.selectedDistribution
      );

      console.log(`uniData for Item ${index}:`, retrievedData);
      // Update the data state with the retrieved data for the specific item
      setUniqueValues((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = retrievedData;
        // console.log(updatedData);
        return updatedData;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="distribution_container">
      <label htmlFor="Distribution">Distributed by</label>

      {dataSelections.map((data, index) => (
        <div key={index}>
          <select
            id="Distribution"
            className={`Distribution_${index}`}
            value={data.selectedDistribution}
            onChange={(event) => handleDataChange(event, index)}
          >
            <option value={"None"}>None</option>
            {options.children.map((category) => (
              <optgroup key={category.name} label={category.name}>
                {category.children
                  .filter((subcategory) => subcategory.isCategorical)
                  .map((subcategory) => (
                    <option key={subcategory.value} value={subcategory.value} name={subcategory.name}>
                      {subcategory.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default DistributionSelection;
