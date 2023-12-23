import Map from "../Map/Map";
import Analytics from "../Analytics/Analytics";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ExploreData from "../ExploreData/ExploreData";
import "./Analytics_page.css";

const Analytics_page = ({ distinctVariables }) => {

  const [dataSelections, setDataSelections] = useState([
    {
      selectedData: "INCOME",
      selectedDataName: "Household Income",
      selectedDistributionName: "Age",
      selectedDistribution: "AGECL",
      secondarySelectedDistribution: "None",
      secondarySelectedDistributionName: "None",
      selectedDisplay: [{ label: "35 <", value: 1 }],
      secondarySelectedDisplay: [{ label: "None", value: "None" }],
    },
  ]);

  const [uniqueValues, setUniqueValues] = useState([
    [
      {
        label: "less than 35",
        value: 1,
      },
      { label: "35-44", value: 2 },
      { label: "45-54", value: 3 },
      { label: "55-64", value: 4 },
      { label: "65-74", value: 5 },
      { label: "more than 75", value: 6 },
    ],
  ]);

  return (
    <>
      <div className="analytics_page_container">
        <div className="analytics_page_map_container">
          <Map
            distinctVariables={distinctVariables}
            dataSelections={dataSelections}
            setDataSelections={setDataSelections}
            uniqueValues={uniqueValues}
            setUniqueValues={setUniqueValues}
          />
        </div>
        <div className="analytics_page_analytics_container">
          <Analytics
            dataSelections={dataSelections}
            setDataSelections={setDataSelections}
            uniqueValues={uniqueValues}
            setUniqueValues={setUniqueValues}
          />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Analytics_page;
