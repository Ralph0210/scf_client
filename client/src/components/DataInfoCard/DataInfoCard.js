import React from 'react'
import './DataInfoCard.css'
import { Clear } from "@mui/icons-material";
import { motion } from "framer-motion";
import { distinctValues } from "../api";


const DataInfoCard = (props) => {
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

    const { data, setShouldRenderDataInfoCard, dataSelections, setDataSelections, uniqueValues, setUniqueValues} = props
    console.log(data)

    const addData = (data) => {
      
      const selectedData = data.value
      const selectedDataName = data.name
      const updatedData = [...dataSelections]
      updatedData[0].selectedData = selectedData
      updatedData[0].selectedDataName = selectedDataName
      setDataSelections(updatedData)
    }

    const addCategoricalData = (data) => {
      
      const selectedDistribution = data.value
      const selectedDistributionName = data.name
      const updatedData = [...dataSelections]
      updatedData[0].selectedDistribution = selectedDistribution
      updatedData[0].selectedDistributionName = selectedDistributionName
      updatedData[0].selectedDisplay = []
      fetchDistinctValues(updatedData[0], 0);
      setDataSelections(updatedData)
    }

  return (
    <motion.div className='dataCard'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
       
        <div className='hid-box'>
          <motion.h4
          key={data.name} // Ensure a unique key for smooth transitions
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          >{data.name}</motion.h4>
          <motion.div
          key={data.description} // Ensure a unique key for smooth transitions
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // Adjust the duration as needed
        >
        {data.description}
        </motion.div>
        {/* {data.isCategorical ?  <button className='dataInfoButton' style={{backgroundColor: "#70B77E"}} onClick={() => addCategoricalData(data)}>Add to distribution</button> :  <button className='dataInfoButton' style={{backgroundColor:"#0E518E"}} onClick={() => addData(data)}>Add</button>} */}
        {data.noAdd ? (
  "" // If noAdd is true, return an empty string
) : (
  data.isCategorical ? (
    <button className='dataInfoButton' style={{ backgroundColor: "#70B77E" }} onClick={() => addCategoricalData(data)}>
      Select this distribution
    </button>
  ) : (
    <button className='dataInfoButton' style={{ backgroundColor: "#0E518E" }} onClick={() => addData(data)}>
      Select this data
    </button>
  )
)}
        </div>
        <div onClick={() => setShouldRenderDataInfoCard(false)} className='dataCard-close'><Clear /></div>
        </motion.div>
  )
}

export default DataInfoCard