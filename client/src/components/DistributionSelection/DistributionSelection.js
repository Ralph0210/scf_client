import React, {useState} from "react";
import "./DistributionSelection.css";
import { distinctValues } from "../api";
import options from "../../newVar.json";
import { Clear, Add } from "@mui/icons-material";

const DistributionSelection = ({
  dataSelections,
  setDataSelections,
  setUniqueValues,
  toggleSecondaryDistribution,
  setToggleSecondaryDistribution,
  setSecondaryUniqueValues
}) => {
  const handleClose = (e) => {
    setToggleSecondaryDistribution(false);
    const updatedValue = [...dataSelections];
    updatedValue[0].secondarySelectedDistribution = "None"
    updatedValue[0].secondarySelectedDistributionName = "None"
    updatedValue[0].secondarySelectedDisplay = [
      {
        label: "None",
        value: "None",
      },
    ];
    setDataSelections(updatedValue);
  }


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
    console.log("first selection", updatedValue);
  };

  const handleSecondaryDataChange = (e, index) => {
    const secondarySelectedDistribution= e.target.value;
    const secondarySelectedDistributionName = e.target.options[e.target.selectedIndex].getAttribute('name'); 
    const updatedValue = [...dataSelections];
    if (e.target.value === "None") {
      updatedValue[index].secondarySelectedDistribution = secondarySelectedDistribution;
      updatedValue[index].secondarySelectedDisplay = [
        {
          label: "None",
          value: "None",
        },
      ];
    } else {
      updatedValue[index].secondarySelectedDistribution = secondarySelectedDistribution;
      updatedValue[index].secondarySelectedDistributionName = secondarySelectedDistributionName;
      updatedValue[index].secondarySelectedDisplay = [];
      console.log(secondarySelectedDistribution, secondarySelectedDistributionName)
      fetchSecondaryDistinctValues(updatedValue[index], index);
    }
    setDataSelections(updatedValue);
    console.log("secondary selection", updatedValue);
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

  const fetchSecondaryDistinctValues = async (dataSelection, index) => {
    try {
      const apiParams = {
        selectedDistribution: dataSelection.secondarySelectedDistribution,
      };

      const retrievedData = await distinctValues(
        apiParams.selectedDistribution
      );

      console.log(`uniData for Item ${index}:`, retrievedData);
      // Update the data state with the retrieved data for the specific item
      setSecondaryUniqueValues((prevData) => {
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

      <div className="distribution_selection">
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
        <div onClick={() => setToggleSecondaryDistribution(!toggleSecondaryDistribution)} className="addition_container"  style={{backgroundColor: toggleSecondaryDistribution? "#FDFFFC" : "#CBE5D0", color: toggleSecondaryDistribution? "#FDFFFC" : "#70B77E"}}>
         <div><Add /></div>
         </div>

        <div className='connection'></div>
      </div>

      {toggleSecondaryDistribution && (
      <div className="secondary_distribution_selection">
        <img src="/connection.png" className="connection_img"/>
      {dataSelections.map((data, index) => (
        <div key={index}>
          <select
            id="secondary_distribution"
            className={`Distribution_${index}`}
            value={data.secondarySelectedDistribution}
            onChange={(event) => handleSecondaryDataChange(event, index)}
          >
            <option value={"None"}>None</option>
            {options.children.map((category) => (
              <optgroup key={category.name} label={category.name}>
                {category.children
                  .filter((subcategory) => subcategory.isCategorical)
                  .map((subcategory) => (
                    <option key={subcategory.value} value={subcategory.value} name={subcategory.name} disabled={subcategory.value === data.selectedDistribution} >
                      {subcategory.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>
      ))}
      <div className="secondary_deletion_container">
      <p onClick={handleClose}><Clear/></p>
      </div>
      <div className='connection'></div>
      </div>)}

    </div>
  );
};

export default DistributionSelection;
