import React from 'react';

const DataSelection = ({
  uniqueValues,
  setUniqueValues,
  data,
  setData,
  dataSelections,
  setDataSelections,
}) => {

  const handleDataChange = (e, index) => {
    const selectedData = e.target.value;
    const updatedValue = [...dataSelections];
    updatedValue[index].selectedData = selectedData;
    setDataSelections(updatedValue);
  };

  const handleAddition = () => {
    const updatedElements = [...dataSelections];
    updatedElements.push({
      selectedData: "INCOME",
      selectedDistribution: "EDCL",
      selectedDisplay: [{
        "label": 1,
        "value": 1
    }],
    });
    setDataSelections(updatedElements);

    const updatedData = [...data];
    updatedData.push([]);
    setData(updatedData);

    const updatedUniqueValues = [...uniqueValues];
    updatedUniqueValues.push([]);
    setUniqueValues(updatedUniqueValues);
  };

  return (
    <div className='data_container'>
      <label>Data</label>
      {dataSelections.map((data, index) => (
        <div key={index}>
          <select
            id={`Data_${index}`}
            className='Data'
            value={data.selectedData} // Fixed property name
            onChange={(event) => handleDataChange(event, index)}
          >
            <option value={"EDCL"}>Education</option>
            <option value={"HHSEX"}>Sex</option>
            <option value={"INCOME"}>Income</option>
            <option value={"RENT"}>Rent</option>
            <option value={"FIN"}>FIN</option>
          </select>
        </div>
      ))}
      {/* <p onClick={handleAddition}>+</p> */}
    </div>
  );
};

export default DataSelection;