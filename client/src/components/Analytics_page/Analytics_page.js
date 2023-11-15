import Map from '../Map/Map'
import Analytics from '../Analytics/Analytics'
import React, {useState} from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ExploreData from '../ExploreData/ExploreData'
import './Analytics_page.css'

const Analytics_page = ({distinctVariables}) => {
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
  return (
    <>
    <div className='analytics_page_container'>
        <div className='analytics_page_map_container'>
            <Map distinctVariables={distinctVariables} dataSelections={dataSelections} setDataSelections={setDataSelections}/>
            </div>
        <div className='analytics_page_analytics_container'>
            <Analytics dataSelections={dataSelections} setDataSelections={setDataSelections}/>
            <Footer />
            </div>
    </div>
    
    </>
  )
}

export default Analytics_page