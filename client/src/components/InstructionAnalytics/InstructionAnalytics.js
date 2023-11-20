import React from "react";
import "../Analytics/Analytics.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import DataSelection from "./DataSelection"
import DistributionSelection from "../DistributionSelection/DistributionSelection";
import { retrieve } from "../api";

const InstructionAnalytics = () => {
  const [uniqueValues, setUniqueValues] = useState([
    [
      {
        label: 4,
        value: 4,
      },
      {
        label: 2,
        value: 2,
      },
      {
        label: 3,
        value: 3,
      },
      {
        label: 1,
        value: 1,
      },
    ],
  ]);
  const [dataSelections, setDataSelections] = useState([
    {
      selectedData: "INCOME",
      selectedDistribution: "EDCL",
      selectedDisplay: [
        {
          label: 1,
          value: 1,
        },
      ],
    },
  ]);

  const [data, setData] = useState([]);
  const [dataForGraphing, setDataForGraphing] = useState([])
  const [selectedUnit, setSelectedUnit] = useState("Mean"); // Set initial selected option

  const [value, setValue] = useState([2010, 2019]);


  useEffect(() => {
    // Create a function to fetch data for a single item in dataSelections
    const fetchDataForItem = async (
      dataSelection,
      selectedUnit,
      value,
      index
    ) => {
      try {
        const apiParams = {
          selectedYear: value.join("-"),
          selectedData: dataSelection.selectedData,
          selectedDistribution: dataSelection.selectedDistribution,
          selectedUnit: selectedUnit,
        };

        // Loop through selectedDisplay values and fetch data for each
        const retrievedData = await Promise.all(
          dataSelection.selectedDisplay.map(async (displayValue, index) => {
            const data = await retrieve(
              apiParams.selectedYear,
              apiParams.selectedData,
              apiParams.selectedDistribution,
              displayValue.value, // Use the current displayValue from the map
              apiParams.selectedUnit
            );
            return data;
          })
        );

        // console.log(`Data for Item ${index}:`, retrievedData);
        // Update the data state with the retrieved data for the specific item
        setData((prevData) => {
          const updatedData = [...prevData];
          updatedData[index] = retrievedData;
          return updatedData;
        });
      } catch (error) {
        console.error(error);
      }
    };

    // Loop through dataSelections and fetch data for each item
    dataSelections.forEach((dataSelection, index) => {
      fetchDataForItem(dataSelection, selectedUnit, value, index);
    });
  }, [dataSelections, setData, setSelectedUnit, setValue, value]);

  console.log("data", JSON.stringify(data))

  function mergeDataByYear(data) {
    const mergedData = {};
  
    data.forEach(dataArray => {
      dataArray.forEach(dataArray2 => {
        dataArray2.forEach(item => {
        const year = item.year;
        if (!mergedData[year]) {
          mergedData[year] = {};
        }
        Object.keys(item).forEach(key => {
          mergedData[year][key] = item[key];})
        });
      });
    });

    const mergedDataArray = Object.values(mergedData);
    return mergedDataArray;
  }

  useEffect(() => {
    const newData = mergeDataByYear(data)
    setDataForGraphing(newData)
    console.log("dataforgraphing", newData)
  }, [data, dataSelections])

  let lines = null;

  if (dataForGraphing.length > 0) {
    lines = Object.keys(dataForGraphing[0])
      .filter(key => key !== 'year')
      .map((key, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey={key}
          stroke={`#70B77E`}
          activeDot={{ r: 8 }}
        />
      ));
      }

  return (
    <div className="analytics_container">
    <video
      src="/analysisDemo.mov"
      width="100%"
      height="100%"
      autoPlay
      loop
    >
    </video>
  </div>
  );
};

export default InstructionAnalytics;