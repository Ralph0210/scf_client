const express = require("express");
const cors = require("cors");
const db = require("./models");
const {scfp2022, scfp2019, scfp2016, scfp2013, scfp2010, scfp2007, scfp2004, scfp2001, scfp1998, scfp1995, scfp1992, scfp1989 } = require("./models"); // Import your Sequelize models
require("dotenv").config();
const path = require('path')

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Define the tables for each year
const YearTables = {
  1989: scfp1989,
  1992: scfp1992,
  1995: scfp1995,
  1998: scfp1998,
  2001: scfp2001,
  2004: scfp2004,
  2007: scfp2007,
  2010: scfp2010,
  2013: scfp2013,
  2016: scfp2016,
  2019: scfp2019,
  2022: scfp2022,
};

app.get("/api/survey", async (req, res) => {
  const {
    selectedYear,
    selectedData,
    selectedDistribution,
    selectedDisplay,
    selectedUnit,
    selectedDataName,
    selectedDistributionName,
    selectedDisplayName,
    secondarySelectedDistribution,
    secondarySelectedDistributionName,
    secondarySelectedDisplay,
    secondarySelectedDisplayName,
  } = req.query;

  try {
    // Parse selectedYear as a range (e.g., "2010-2019")
    const [startYear, endYear] = selectedYear.split("-");

    // Validate that startYear and endYear are valid numbers
    if (isNaN(startYear) || isNaN(endYear)) {
      return res.status(400).json({ error: "Invalid year range" });
    }

    // Create an array to store the results from each year's table
    const results = [];

    for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
      // Continue with your logic for these specific years
      if (YearTables[year]) {
        const whereClause = {};
        if (selectedDistribution !== "None") {
          whereClause[selectedDistribution] = selectedDisplay;
        }

        if (secondarySelectedDistribution!== "None") {
          // whereClause[secondarySelectedDistribution] = secondarySelectedDisplay;
          whereClause[secondarySelectedDistribution] = secondarySelectedDisplay;
        }
        console.log("whereclause", whereClause, "whereClause");

        const surveyData = await YearTables[year].findAll({
          where: whereClause,
          attributes: [selectedData, "WGT"],
        })

            // Calculate the statistic based on selectedUnit
            let statistic = null;
            const totalWGT = surveyData.reduce((acc, entry) => acc + entry.dataValues.WGT, 0);
            if (selectedUnit === "Mean") {
              const totalVWGT = surveyData.reduce((acc, entry) => acc + entry.dataValues[selectedData] * entry.dataValues.WGT, 0);
             
              statistic = totalVWGT / totalWGT;
            } else if (selectedUnit === "Median") {
              // Calculate the weighted median if selectedUnit is "Median"
              const sortedEntries = surveyData
                .map(entry => ({ value: entry.dataValues[selectedData], weight: entry.dataValues.WGT }))
                .sort((a, b) => a.value - b.value);
            
              let accumulatedWeight = 0;
              let targetWeight = totalWGT / 2; // For median, use totalWGT / 2 as the target weight
            
              for (const entry of sortedEntries) {
                accumulatedWeight += entry.weight;
                if (accumulatedWeight >= targetWeight) {
                  // Found the median element
                  statistic = entry.value;
                  break;
                }
              }
            }else if (selectedUnit === "Log Mean") {
              // Calculate the weighted logarithmic mean if selectedUnit is "Log Mean"
              const logValues = surveyData.map(entry => ({ logValue: Math.log(entry.dataValues[selectedData]), weight: entry.dataValues.WGT }));
              const totalWeightedLog = logValues.reduce((acc, { logValue, weight }) => acc + logValue * weight, 0);
              const totalWeight = logValues.reduce((acc, { weight }) => acc + weight, 0);
              console.log(totalWeight)
              statistic = totalWeightedLog / totalWeight;
            } else if (selectedUnit === "Log Median") {
              // Calculate the weighted logarithmic median if selectedUnit is "Log Median"
              const sortedEntries = surveyData
                .map(entry => ({ logValue: Math.log(entry.dataValues[selectedData]), weight: entry.dataValues.WGT }))
                .sort((a, b) => a.logValue - b.logValue);
            
              let accumulatedWeight = 0;
              let targetWeight = totalWGT / 2; // For median, use totalWeight / 2 as the target weight
            
              for (const entry of sortedEntries) {
                accumulatedWeight += entry.weight;
                if (accumulatedWeight >= targetWeight) {
                  // Found the median element
                  statistic = entry.logValue;
                  break;
                }
              }
            }

        const dataObject = {
          year: year,
        };
        
        if (secondarySelectedDisplayName !== "None") {
          // Include the property only if secondarySelectedDisplayName is not "None"
          dataObject[`${selectedDistributionName} ${selectedDisplayName} ${secondarySelectedDisplayName}`] = statistic;
        } else{
          dataObject[`${selectedDistributionName} ${selectedDisplayName} `] = statistic;
        }

        console.log("dataobjecct", dataObject, 'dataObject')

        results.push(dataObject);
      }
    }

    // for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
    //   if (YearTables[year]) {
    //     const dataObject = {
    //       year: year,
    //     };
    
    //     for (const primaryOption of selectedDistribution.split(',')) {
    //       // Iterate through secondary distribution selections
    //       for (const secondaryOption of secondarySelectedDistribution.split(',')) {
    //         const whereClause = {
    //           [selectedDistribution]: selectedDisplay,
    //           [secondarySelectedDistribution]: secondarySelectedDisplay,
    //         };
    
    //         // Fetch data from Sequelize model
    //         const surveyData = await YearTables[year].findAll({
    //           where: whereClause,
    //           attributes: [selectedData, "WGT"],
    //         });
    
    //         // Calculate the weighted mean if selectedUnit is "Mean"
    //         let weightedMean = null;
    //         if (selectedUnit === "Mean") {
    //           const totalVWGT = surveyData.reduce((acc, entry) => {
    //             return acc + entry.dataValues[selectedData] * entry.dataValues.WGT;
    //           }, 0);
    
    //           const totalWGT = surveyData.reduce((acc, entry) => {
    //             return acc + entry.dataValues.WGT;
    //           }, 0);
    
    //           weightedMean = totalVWGT / totalWGT;
    //         }
    
    //         // Add the result to the dataObject
    //         const resultKey = `${primaryOption} ${secondaryOption}`;
    //         dataObject[resultKey] = weightedMean;
    //       }
    //     }
    
    //     console.log("dataObject", dataObject);
    //     results.push(dataObject);
    //   }
    // }

    // Combine the results from each year and send them as a single response
    const combinedResults = results.flat();
    res.json(combinedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// app.get("/distinct-values", async (req, res) => {
//   const { selectedDistribution } = req.query;
//   try {
//     const distinctValues = await scfp2019.findAll({
//       attributes: [
//         [
//           db.sequelize.fn("DISTINCT", db.sequelize.col(selectedDistribution)),
//           "value",
//         ],
//       ],
//       where: {
//         // Add any additional conditions if needed
//       },
//     });

//     // Map the distinct values into the desired format
//     const formattedValues = distinctValues.map((item) => ({
//       label: item.dataValues.value, // Use the value as the label
//       value: item.dataValues.value, // Use the value as the value
//     }));

//     res.json(formattedValues);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.get("/distinct-values", async (req, res) => {
  const { selectedDistribution } = req.query;
  try {
    const distinctValues = await scfp2019.findAll({
      attributes: [
        [
          db.sequelize.fn("DISTINCT", db.sequelize.col(selectedDistribution)),
          "value",
        ],
      ],
      where: {
        // Add any additional conditions if needed
      },
    });

    // Map the distinct values into the desired format with custom labels
    const formattedValues = distinctValues.map((item) => {
      // Define a function to determine the label and value based on the selectedDistribution
      function getLabelAndValue(value) {
        if (selectedDistribution === "AGECL") {
          // Parse the value as an integer
          const AGECL = parseInt(value);

          if (AGECL === 1) {
            // When AGECL is 1, return "< 35" as the label and 1 as the value
            return { label: "less than 35", value: 1 };
          } else if (AGECL === 2) {
            // When AGECL is 2, return "35-44" as the label and 2 as the value
            return { label: "35-44", value: 2 };
          } else if (AGECL === 3) {
            // When AGECL is 3, return "45-54" as the label and 3 as the value
            return { label: "45-54", value: 3 };
          } else if (AGECL === 4) {
            // When AGECL is 4, return "55-64" as the label and 4 as the value
            return { label: "55-64", value: 4 };
          } else if (AGECL === 5) {
            // When AGECL is 5, return "65-74" as the label and 5 as the value
            return { label: "65-74", value: 5 };
          } else if (AGECL === 6) {
            // When AGECL is 6, return "75+" as the label and 6 as the value
            return { label: "75 or older", value: 6 };
          }
          
          return { label: value, value: value };
        } else if (selectedDistribution === "MARRIED") {
          const MARRIED = parseInt(value);

          if (MARRIED === 1) {
            return { label: "married", value: 1 };
          }
          return { label: "not married", value: 2 }
        }
        else if (selectedDistribution === "RACECL4") {
          const RACECL4 = parseInt(value);

        if (RACECL4 === 1) {
          return { label: "White non-Hispanic", value: 1 };
        } else if (RACECL4 === 2) {
          return { label: "Black/African-American non-Hispanic", value: 2 };
        } else if (RACECL4 === 3) {
          return { label: "Hispanic or Latino", value: 3 };
        } else if (RACECL4 === 4) {
          return { label: "Other or Multiple race", value: 4 };
        } else {
          // Handle other RACECL4 values as needed
          // You can add more conditions for different RACECL4 values here
          // For unknown values, return the value itself as both label and value
          return { label: item.dataValues.value, value: RACECL4 };
        }
        }else if (selectedDistribution === "OCCAT2") {
          const OCCAT2 = parseInt(value);

        if (OCCAT2 === 1) {
          return { label: "Managerial/Professional", value: 1 };
        } else if (OCCAT2 === 2) {
          return { label: "Technical/Sales/Services", value: 2 };
        } else if (OCCAT2 === 3) {
          return { label: "Other", value: 3 };
        } else if (OCCAT2 === 4) {
          return { label: "Not Working", value: 4 };
        } else {
          // Handle other OCCAT2 values as needed
          // You can add more conditions for different OCCAT2 values here
          // For unknown values, return the value itself as both label and value
          return { label: item.dataValues.value, value: OCCAT2 };
        }
        }
        
        
        else {
          // Default case, return the value as both label and value
          return { label: value, value: value };
        }
      }

      const { label, value } = getLabelAndValue(item.dataValues.value);

      return { label, value };
    });

    formattedValues.sort((a, b) => a.value - b.value);


    res.json(formattedValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

db.sequelize.sync().then(() => {
  app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
.catch((err) => {
  console.log(err)})

// Export the function for use in your frontend
module.exports = {};
