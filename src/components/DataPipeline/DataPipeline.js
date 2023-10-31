import React from "react";
import "./DataPipeline.css";
import DataSelection from "../DataSelection/DataSelection";
import DistributionSelection from "../DistributionSelection/DistributionSelection";
import DisplaySelection from "../DisplaySelection/DisplaySelection";

const DataPipeline = ({
  uniqueValues,
  setUniqueValues,
  dataSelections,
  setDataSelections,
  data,
  setData,
}) => {
  return (
    <div className="source">
      <DataSelection
        uniqueValues={uniqueValues}
        setUniqueValues={setUniqueValues}
        dataSelections={dataSelections}
        setDataSelections={setDataSelections}
        data={data}
        setData={setData}
      />

      <DistributionSelection
        dataSelections={dataSelections}
        setDataSelections={setDataSelections}
        setUniqueValues={setUniqueValues}
      />

      <DisplaySelection
        uniqueValues={uniqueValues}
        setUniqueValues={setUniqueValues}
        dataSelections={dataSelections}
        setDataSelections={setDataSelections}
        data={data}
        setData={setData}
      />
    </div>
  );
};

export default DataPipeline;
