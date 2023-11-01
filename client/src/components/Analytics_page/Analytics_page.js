import Map from '../Map/Map'
import Analytics from '../Analytics/Analytics'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ExploreData from '../ExploreData/ExploreData'
import './Analytics_page.css'

const Analytics_page = ({distinctVariables}) => {
  return (
    <>
    <div className='analytics_page_container'>
        <div className='analytics_page_map_container'>
            <Map distinctVariables={distinctVariables}/>
            </div>
        <div className='analytics_page_analytics_container'>
            <Analytics />
            <Footer />
            </div>
    </div>
    
    </>
  )
}

export default Analytics_page