import React from "react";
import FileSaver from "file-saver";
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
  Label
} from "recharts";
import { useState, useEffect, useCallback, useRef } from "react";
import YearRangeSelection from "../YearRangeSelection/YearRangeSelection";
import UnitSelection from "../UnitSelection/UnitSelection";
import DataPipeline from "../DataPipeline/DataPipeline";
import { retrieve } from "../api";
import DataSelection from "../DataSelection/DataSelection";
import DistributionSelection from "../DistributionSelection/DistributionSelection";
import DisplaySelection from "../DisplaySelection/DisplaySelection";
import { useCurrentPng, useGenerateImage } from "recharts-to-png";

const getRandomColor = () => {
  // Generate a random hue between 0 and 360
  const hue = Math.floor(Math.random() * 360);
  // Create an HSL color
  return `hsl(${hue}, 70%, 50%)`;
};

const Analytics = () => {
    // useCurrentPng usage (isLoading is optional)
    // const [getPng, { lineCharRef, isLoading }] = useCurrentPng();

    // Can also pass in options for html2canvas
    // const [getPng, { ref }] = useCurrentPng({ backgroundColor: '#000' });
  
    // const handleDownload = useCallback(async () => {
    //   const png = await getPng();
  
    //   // Verify that png is not undefined
    //   if (png) {
    //     // Download with FileSaver
    //     FileSaver.saveAs(png, 'myChart.png');
    //   }
    // }, [getPng]);

  const [toggleSecondaryDistribution, setToggleSecondaryDistribution] = useState(false)
  const [lines, setLines] = useState([]);
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
      { label: "75+", value: 6 },
    ],
  ]);

  const [secondaryUniqueValues, setSecondaryUniqueValues] = useState([
    [
      {
        label: "None",
        value: "None",
      },
    ],
  ]);

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

  console.log(dataSelections, 'dataSelections')

  const [data, setData] = useState([]);
  const [dataForGraphing, setDataForGraphing] = useState([]);
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
          secondarySelectedDistribution: dataSelection.secondarySelectedDistribution,
          secondarySelectedDistributionName: dataSelection.secondarySelectedDistributionName,
          secondarySelectedDisplay: dataSelection.secondarySelectedDisplay,
        };
        console.log(apiParams,'api')

        // Loop through selectedDisplay values and fetch data for each
        // const retrievedData = await Promise.all(
        //   dataSelection.selectedDisplay.map(async (displayValue, index) => {
        //     const matchingDisplay = dataSelection.selectedDisplay.find(
        //       (display) => display.value === displayValue.value
        //     );
        //     const data = await retrieve(
        //       apiParams.selectedYear,
        //       apiParams.selectedData,
        //       apiParams.selectedDistribution,
        //       displayValue.value, // Use the current displayValue from the map
        //       apiParams.selectedUnit,
        //       apiParams.selectedDataName,
        //       apiParams.selectedDistributionName,
        //       matchingDisplay.label, // Use the current displayValue from the map
        //       apiParams.secondarySelectedDistribution,
        //       apiParams.secondarySelectedDistributionName,
        //       // Pass secondarySelectedDisplay values to the retrieve function
        //   apiParams.secondarySelectedDisplay.map(secondaryDisplay => secondaryDisplay.value),
        //     );
        //     // Find the selectedDisplay object that matches the current displayValue.value

        //     return data;
        //   })
        // );

        const retrievedData = await Promise.all(
          dataSelection.selectedDisplay.map(async (primaryDisplayValue, primaryIndex) => {
            const matchingPrimaryDisplay = dataSelection.selectedDisplay.find(
              (display) => display.value === primaryDisplayValue.value
            );
        
            const primaryData = await Promise.all(
              dataSelection.secondarySelectedDisplay.map(async (secondaryDisplayValue, secondaryIndex) => {
                const matchingSecondaryDisplay = dataSelection.secondarySelectedDisplay.find(
                  (display) => display.value === secondaryDisplayValue.value
                );
        
                const data = await retrieve(
                  apiParams.selectedYear,
                  apiParams.selectedData,
                  apiParams.selectedDistribution,
                  primaryDisplayValue.value, // Use the current primary display value
                  apiParams.selectedUnit,
                  apiParams.selectedDataName,
                  apiParams.selectedDistributionName,
                  matchingPrimaryDisplay.label, // Use the current primary display label
                  apiParams.secondarySelectedDistribution,
                  apiParams.secondarySelectedDistributionName,
                  secondaryDisplayValue.value, // Use the current secondary display value
                  matchingSecondaryDisplay.label // Use the current secondary display label
                );
        
                return data;
              })
            );
        
            return primaryData;
          })
        );
        

        // console.log(`Data for Item ${index}:`, retrievedData);
        // Update the data state with the retrieved data for the specific item
        setData((prevData) => {
          const updatedData = [...prevData];
          updatedData[index] = retrievedData;
          const mergedArray = [].concat(...updatedData[index]);
          console.log(mergedArray, 'updatedData')
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
  }, [dataSelections, setData, setSelectedUnit, setValue, value, selectedUnit]);

  // console.log("data", JSON.stringify(data))

  // function mergeDataByYear(data) {
  //   const mergedData = {};

  //   data.forEach((dataArray) => {
  //     dataArray.forEach((dataArray2) => {
  //       dataArray2.forEach((item) => {
  //         const year = item.year;
  //         if (!mergedData[year]) {
  //           mergedData[year] = {};
  //         }
  //         Object.keys(item).forEach((key) => {
  //           mergedData[year][key] = item[key];
  //         });
  //       });
  //     });
  //   });

  //   const mergedDataArray = Object.values(mergedData);
  //   return mergedDataArray;
  // }


  function mergeArraysByYear(data) {
    const mergedData = {};
  
    data.forEach(innerArray => {
      console.log(innerArray, 'innerArray')
      innerArray.forEach(innerArray2 => {
        innerArray2.forEach(innerArray3 => {
          innerArray3.forEach(obj => {
          console.log(obj, 'obj')
          const year = obj.year;
    
          if (!mergedData[year]) {
            mergedData[year] = { year };
          }
    
          // Merge properties into the existing year object
          Object.assign(mergedData[year], obj);
        });
        })
      })
    });
  
    const mergedArray = Object.values(mergedData);
  
    return mergedArray;
  }
  

  useEffect(() => {
    // const newData = mergeDataByYear(data);
    const newData = mergeArraysByYear(data);
    setDataForGraphing(newData);
    console.log("dataforgraphing", newData);
  }, [data, dataSelections]);
  // console.log(dataSelections, "dataselections")

  const lineColors = [
    '#0E518E',
    '#70B77E',
    '#FF9F1C',
    '#D81E5B',
    '#092327',
    '#2B9EB3',
    '#3E6259',
    '#561643',
    '#C05746',
    '#001242'
  ];

  useEffect(() => {
    let line = null;
    if (dataForGraphing.length > 0 && dataSelections[0]) {
      line = Object.keys(dataForGraphing[0])
        .filter((key) => key !== "year")
        .map((key, index) => {
          return (
            <Line
              key={index}
              type="monotone"
              dataKey={key}
              // stroke={`hsl(${Math.random() * 360}, 70%, 50%)`}
              stroke={lineColors[index % lineColors.length]}
              activeDot={{ r: 8 }}
            />
          );
        });
      setLines(line);
    }
  }, [dataForGraphing, dataSelections]);

  const defaultChartHeight = 350;
  const extendedChartHeight = 500;

  const getChartHeight = () => {
    if (dataForGraphing.length > 0 && dataForGraphing[0].length > 8) {
      console.log('true hehe')
      return extendedChartHeight;
    }
    return defaultChartHeight;
  };

  const tooltipFormatter = (value, name) => [`$${value.toFixed(2)}`, name];

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
          toggleSecondaryDistribution={toggleSecondaryDistribution}
          setToggleSecondaryDistribution={setToggleSecondaryDistribution}
          setSecondaryUniqueValues={setSecondaryUniqueValues}
        />

        <DisplaySelection
          uniqueValues={uniqueValues}
          setUniqueValues={setUniqueValues}
          dataSelections={dataSelections}
          setDataSelections={setDataSelections}
          data={data}
          setData={setData}
          toggleSecondaryDistribution={toggleSecondaryDistribution}
          secondaryUniqueValues={secondaryUniqueValues}
          setSecondaryUniqueValues={setSecondaryUniqueValues}
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

      <h3 className="chart_title">{dataSelections[0].selectedDataName} by {dataSelections[0].selectedDistributionName} {dataSelections[0].secondarySelectedDistributionName === "None" ? "" : `and ${dataSelections[0].secondarySelectedDistributionName}`}</h3>

      {lines && (<ResponsiveContainer width="90%" height={400}>
      <LineChart
        data={dataForGraphing}
        margin={{
          top: 20,
          right: 30,
          left: 65,
          bottom: 0,
        }}
        // ref={lineCharRef}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year">
        <Label value="year" offset={-10} position="insideBottomLeft" />
        </XAxis>
        <YAxis>
        <Label value="dollars" position="left" offset={10} angle={-90}/>
        </YAxis>
        <Tooltip
        formatter={tooltipFormatter}
          wrapperStyle={{
            fontFamily: "Helvetica Neue",
            fontSize: "1.4rem",
            width: "max-width",

          }}
          itemStyle={{ display: "flex", gap: "0.5rem" }}
        />
        <Legend
          wrapperStyle={{ fontFamily: "Helvetica Neue", fontSize: "1.4rem", display:"flex", flexDirection: "column" }}
        />
        {/* <button onClick={handleDownload}>
        {isLoading ? 'Downloading...' : 'Download Chart'}
      </button> */}
        
        {lines}
      </LineChart>
      </ResponsiveContainer>)}
    </div>
  );
};

export default Analytics;
