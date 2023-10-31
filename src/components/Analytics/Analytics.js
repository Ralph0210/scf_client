import React from "react";
import "./Analytics.css";
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
import YearRangeSelection from "../YearRangeSelection/YearRangeSelection";
import UnitSelection from "../UnitSelection/UnitSelection";
import DataPipeline from "../DataPipeline/DataPipeline";
import { retrieve } from "../api";
import DataSelection from "../DataSelection/DataSelection";
import DistributionSelection from "../DistributionSelection/DistributionSelection";
import DisplaySelection from "../DisplaySelection/DisplaySelection";

const getRandomColor = () => {
  // Generate a random hue between 0 and 360
  const hue = Math.floor(Math.random() * 360);
  // Create an HSL color
  return `hsl(${hue}, 70%, 50%)`;
};

const Analytics = () => {
  const [lines, setLines] = useState([])
  const [lineColors, setLineColors] = useState([]);
  const [uniqueValues, setUniqueValues] = useState([
    [
      {
        label: "35 <",
        value: 1,
      },
      { label: "35-44", value: 2 },
      { label: "45-54", value: 3 },
      { label: "55-64", value: 4 },
      { label: "65-74", value: 5 },
      { label: "75+", value: 6 }
    ],
  ]);
  const [dataSelections, setDataSelections] = useState([
    {
      selectedData: "INCOME",
      selectedDataName: "Household Income",
      selectedDistributionName: "Age",
      selectedDistribution: "AGECL",
      selectedDisplay: [ {label: "35 <", value: 1},
      ],
    },
  ]);

  const [data, setData] = useState([]);
  const [dataForGraphing, setDataForGraphing] = useState([])
  const [selectedUnit, setSelectedUnit] = useState("Mean"); // Set initial selected option

  const [value, setValue] = useState([1989, 2019]);
  // console.log(data, 'data')


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
          selectedDataName: dataSelection.selectedDataName,
          selectedDistributionName: dataSelection.selectedDistributionName,
        };

        // Loop through selectedDisplay values and fetch data for each
        const retrievedData = await Promise.all(
          dataSelection.selectedDisplay.map(async (displayValue, index) => {
            const matchingDisplay = dataSelection.selectedDisplay.find(
              (display) => display.value === displayValue.value
            );
            const data = await retrieve(
              apiParams.selectedYear,
              apiParams.selectedData,
              apiParams.selectedDistribution,
              displayValue.value, // Use the current displayValue from the map
              apiParams.selectedUnit,
             apiParams.selectedDataName,
             apiParams.selectedDistributionName,
              matchingDisplay.label // Use the current displayValue from the map
            );
            // Find the selectedDisplay object that matches the current displayValue.value

            return data;
          })
        );

        console.log(`Data for Item ${index}:`, retrievedData);
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

  // console.log("data", JSON.stringify(data))

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
  // console.log(dataSelections, "dataselections")

  useEffect(() => {
    let line = null;
    if (dataForGraphing.length > 0 && dataSelections[0]) {
      line = Object.keys(dataForGraphing[0])
        .filter(key => key !== 'year')
        .map((key, index) => {
            return (
              <Line
                key={index}
                type="monotone"
                dataKey={key}
                stroke={`hsl(${Math.random() * 360}, 70%, 50%)`}
                activeDot={{ r: 8 }}
              />
            );
        });
        setLines(line)
    }
  }, [dataForGraphing, dataSelections]);


  return (
    <div className="analytics_container">
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

      <div className="adjustment">
        <UnitSelection
          selectedUnit={selectedUnit}
          setSelectedUnit={setSelectedUnit}
        />

        <div className="year_range_container">
          <label htmlFor="year_range">Year range</label>
          <div className="year_range">
            <YearRangeSelection
              id="year_range"
              value={value}
              setValue={setValue}
            />
          </div>
        </div>
      </div>

      <LineChart
        width={900}
        height={300}
        data={dataForGraphing}
        margin={{
          top: 5,
          right: 30,
          left: 65,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines}
      </LineChart>
    </div>
  );
};

export default Analytics;
