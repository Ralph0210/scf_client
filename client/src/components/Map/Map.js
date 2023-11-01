import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3'; // Import D3 library
import data from './var.json'
import './Map.css'
import ExploreData from '../ExploreData/ExploreData';
import E3 from '../ExploreData/E3'
import Footer from '../Footer/Footer';
import DataInfoCard from '../DataInfoCard/DataInfoCard';

const Map = ({distinctVariables}) => {
  const [shouldRenderDataInfoCard, setShouldRenderDataInfoCard] =
    useState(false);
    const [selectedInfoData, setSelectedInfoData] = useState(null);
    const Alert = () => (
      <div className='alert'>
      <img src='/desktopIcon.png'/>
      <p>Your screen is too small for the discovery page</p>
      <p>Please access this website from a desktop device.</p>
      </div>
    );
  
//  setSelectedInfoData={setSelectedInfoData} setShouldRenderDataInfoCard={setShouldRenderDataInfoCard}
  return (
    <div className='map_component_container' >
      <Alert />
      {/* <ExploreData distinctVariables={distinctVariables} setSelectedInfoData={setSelectedInfoData} setShouldRenderDataInfoCard={setShouldRenderDataInfoCard}/> */}
      <E3  distinctVariables={distinctVariables} setSelectedInfoData={setSelectedInfoData} setShouldRenderDataInfoCard={setShouldRenderDataInfoCard}/>
      {shouldRenderDataInfoCard && <DataInfoCard data={selectedInfoData} setShouldRenderDataInfoCard={setShouldRenderDataInfoCard}/>}
    </div>
  );
};

export default Map;

