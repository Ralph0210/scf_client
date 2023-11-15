import React from 'react'
import './DataInfoCard.css'
import { Clear } from "@mui/icons-material";

const DataInfoCard = (props) => {
    const { data, setShouldRenderDataInfoCard, dataSelections, setDataSelections} = props
    console.log(data)

    const addData = (data) => {
      
      const selectedData = data.value
      const selectedDataName = data.name
      const updatedData = [...dataSelections]
      updatedData[0].selectedData = selectedData
      updatedData[0].selectedDataName = selectedDataName
      setDataSelections(updatedData)
      console.log('clicked')
    }

    const addCategoricalData = (data) => {
      
      const selectedDistribution = data.value
      const selectedDistributionName = data.name
      const updatedData = [...dataSelections]
      updatedData[0].selectedDistribution = selectedDistribution
      updatedData[0].selectedDistributionName = selectedDistributionName
      setDataSelections(updatedData)
      console.log('clicked')
    }

  return (
    <div className='dataCard'>
       
        <div className='hid-box'>
          <h4>{data.name}</h4>
        {data.description}

        {data.isCategorical ?  <button onClick={() => addCategoricalData(data)}>add to distribution</button> :  <button onClick={() => addData(data)}>add</button>}
       
        </div>
        <div onClick={() => setShouldRenderDataInfoCard(false)} className='dataCard-close'><Clear /></div>
        </div>
  )
}

export default DataInfoCard