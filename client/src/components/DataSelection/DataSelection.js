import React from 'react';
import options from '../../newVar.json'

const DataSelection = ({
  uniqueValues,
  setUniqueValues,
  data,
  setData,
  dataSelections,
  setDataSelections,
}) => {

  // console.log(dataSelections)

  const handleDataChange = (e, index) => {
    const selectedData = e.target.value;
    const selectedDataName = e.target.options[e.target.selectedIndex].getAttribute('name'); // Get the name attribute
    const updatedValue = [...dataSelections];
    updatedValue[index].selectedData = selectedData;
    updatedValue[index].selectedDataName = selectedDataName; // Add the selectedDataName to your data structure
    // console.log(selectedData, selectedDataName);
    setDataSelections(updatedValue);
  };
  

  const handleAddition = () => {
    const updatedElements = [...dataSelections];
    updatedElements.push({
      selectedData: "INCOME",
      selectedDataName: "Household Income",
      selectedDistributionName: "None",
      selectedDistribution: "None",
      selectedDisplay: [],
    });
    setDataSelections(updatedElements);

    const updatedData = [...data];
    updatedData.push([]);
    setData(updatedData);

    const updatedUniqueValues = [...uniqueValues];
    updatedUniqueValues.push([]);
    setUniqueValues(updatedUniqueValues);
  };

  const nonSelectableCategories = ["SCF", "Demographics", "Labor Force", "Financial Behavior"];


  return (
    <div className='data_container'>
      <label>Data</label>
      {dataSelections.map((data, index) => (
        <div key={index} className='data_selection'>
          <select
            id={`Data_${index}`}
            className='Data'
            value={data.selectedData} // Fixed property name
            onChange={(event) => handleDataChange(event, index)}
          ><option value="NETWORTH">Net Worth</option>
            {/* Map through categories and subcategories from 'var.json' and create options */}
            {options.children.map((category) => (
              <optgroup key={category.name} label={category.name}>
                {category.children
                .filter((subcategory) => !subcategory.isCategorical)
                .map((subcategory) => (
                  <option
                    key={subcategory.value}
                    value={subcategory.value}
                    name={subcategory.name}
                    disabled={nonSelectableCategories.includes(subcategory.value)}
                  >
                    {subcategory.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className='connection'  style={{
            backgroundColor:
              data.selectedData === undefined || data.selectedDistribution === undefined
                ? '#FDFFFC'
                : '#7C9CBF', // Set your default color here
          }}></div>
        </div>
        
      ))}
      {/* <p onClick={handleAddition} className='additionButton'>+</p> */}
    </div>
  );
};

export default DataSelection;
