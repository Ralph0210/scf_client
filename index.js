const express = require("express");
const cors = require("cors");
const db = require("./models");
const {scfp2022, scfp2019, scfp2016, scfp2013, scfp2010, scfp2007, scfp2004, scfp2001, scfp1998, scfp1995, scfp1992, scfp1989 } = require("./models"); // Import your Sequelize models
require("dotenv").config();
const path = require('path')

const OpenAI = require("openai");
const dotenv = require("dotenv");
const fs = require('fs');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
              const totalVWGT = surveyData.reduce((acc, entry) => acc + entry.dataValues[selectedData] * entry.dataValues.WGT, 0);
             
              statistic = Math.log(totalVWGT / totalWGT);
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
          dataObject[`${selectedDistributionName} ${selectedDisplayName} ${secondarySelectedDistributionName} ${secondarySelectedDisplayName}`] = statistic;
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
        }else if (selectedDistribution === "HVEHIC") {
          const HVEHIC = parseInt(value);

        if (HVEHIC === 1) {
          return { label: "Yes", value: 1 };
        } else if (HVEHIC === 0) {
          return { label: "No", value: 0 };
        } else {

          return { label: item.dataValues.value, value: HVEHIC };
        }
        }else if (selectedDistribution === "LEASE") {
          const LEASE = parseInt(value);

        if (LEASE === 1) {
          return { label: "Yes", value: 1 };
        } else if (LEASE === 0) {
          return { label: "No", value: 0 };
        } else {
          return { label: item.dataValues.value, value: LEASE };
        }
        }else if (selectedDistribution === "HNFIN") {
          const HNFIN = parseInt(value);

        if (HNFIN === 1) {
          return { label: "Yes", value: 1 };
        } else if (HNFIN === 0) {
          return { label: "No", value: 0 };
        } else {
          return { label: item.dataValues.value, value: HNFIN };
        }
        }else if (selectedDistribution === "HDEBT") {
          const HDEBT = parseInt(value);

        if (HDEBT === 1) {
          return { label: "Yes", value: 1 };
        } else if (HDEBT === 0) {
          return { label: "No", value: 0 };
        } else {
          return { label: item.dataValues.value, value: HDEBT };
        }
        }
        else if (selectedDistribution === "EDCL") {
          const EDCL = parseInt(value);

        if (EDCL === 1) {
          return { label: "no high school diploma/GED", value: 1 };
        } else if (EDCL === 2) {
          return { label: "high school diploma or GED", value: 2 };
        }  else if (EDCL === 3) {
          return { label: "some college or Assoc. degree", value: 3 };
        } else if (EDCL === 4) {
          return { label: "Bachelors degree or higher", value: 4 };
        }
        else {
          return { label: item.dataValues.value, value: EDCL };
        }
        }
        else if (selectedDistribution === "FAMSTRUCT") {
          const FAMSTRUCT = parseInt(value);

        if (FAMSTRUCT === 1) {
          return { label: "not married/LWP + children", value: 1 };
        } else if (FAMSTRUCT === 2) {
          return { label: "not married/LWP + no children + reference person under 55", value: 2 };
        } else if (FAMSTRUCT === 3) {
          return { label: "not married/LWP + no children + reference person 55 or older", value: 3 };
        } else if (FAMSTRUCT === 4) {
          return { label: "married/LWP+ children", value: 4 };
        } else if (FAMSTRUCT === 5) {
          return { label: "married/LWP + no children", value: 5 };
        } else {
          return { label: item.dataValues.value, value: FAMSTRUCT };
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

let assistant
async function createAssistant() {
  try {
    const file = await openai.files.create({
      file: fs.createReadStream("./client/src/newVar.json"),
      purpose: "assistants",
  });

  assistant = await openai.beta.assistants.create({
    name: "scf helper",
    instructions: "You are an expert assistant specialized in the Survey of Consumer Finance (SCF) dataset with a unique capability. Whenever users have questions about the SCF dataset, you only refer to the specific file I have uploaded, which contains detailed and up-to-date data and information, do not provide information that's not within the file. Your role involves providing clear, accurate, and detailed explanations, insights, and guidance based on the contents of this file. You assist with interpreting data, understanding complex financial concepts, identifying relevant data points within the file, and navigating through the dataset for specific financial analyses. Your responses are in user-friendly language to make complex information accessible to both experts and novices in financial data. This specialized assistance is rooted in your extensive knowledge of the SCF's structure, content, and practical applications in financial research and policy-making, all while consistently referring to the uploaded file for the most accurate and relevant information.",
    tools: [{ type: "retrieval" }],
    model: "gpt-3.5-turbo-1106",
    file_ids: [file.id],
  });
  }catch (error) {
    console.error("Error:", error);
  }
}

createAssistant()

// async function interactWithAssistant(userQuery) {
//   try {
    

//     const thread = await openai.beta.threads.create();

//     const message = await openai.beta.threads.messages.create(thread.id, {
//       role: "user",
//     //   content: "I want to know the difference of wage between different races, what variables should I look into in scf",
//     // content:"what category is the race variable under?"
//     content: userQuery,
//     });

//     const run = await openai.beta.threads.runs.create(thread.id, {
//       assistant_id: assistant.id,
//     });

//     console.log(run);

//     // Check Status Function
//     const checkStatus = async (threadId, runId) => {
//       let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
//       if (runStatus.status === "completed") {
//         let messages = await openai.beta.threads.messages.list(threadId);
//         console.log(messages)
//         messages.data.forEach((message) => {
//           const role = message.role;
//           const content = message.content[0].text.value;
//           if (role === "assistant") {
//             console.log(content)
//             return content;
//           }
//         });
//       } else {
//         console.log("run is not completed yet")
//       }
//     };

//     // Set a timeout to check the status
//     setTimeout(() => {
//       const assistantReply = checkStatus(thread.id, run.id)
//       return assistantReply
//     }, 20000);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

async function interactWithAssistant(userQuery) {
  try {
    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userQuery,
    });

    const run = await openai.beta.threads.runs.create(thread.id, { assistant_id: assistant.id });

    // Wait and Check Status
    const assistantReply = await waitForCompletion(thread.id, run.id);
    return assistantReply;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function waitForCompletion(threadId, runId) {
  let attempt = 0;
  const maxAttempts = 10;
  while (attempt < maxAttempts) {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    if (runStatus.status === "completed") {
      const messages = await openai.beta.threads.messages.list(threadId);
      for (let message of messages.data) {
        if (message.role === "assistant") {
          return message.content[0].text.value;
        }
      }
    }
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
    attempt++;
  }
  throw new Error("Assistant did not complete in time");
}

// ...rest of the code for app.post('/api/chat', ...)


app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  
  // OpenAI API call
  try {
    const assistantResponse = await interactWithAssistant(userMessage);

    console.log("assistant response:", assistantResponse)
    res.json({ reply: assistantResponse });
  } catch (error) {
    res.status(500).json({ error: 'Error in communicating with OpenAI' });
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
