import React from 'react'
import './DataInfoCard.css'
import { Clear } from "@mui/icons-material";

const DataInfoCard = (props) => {
    const { data, setShouldRenderDataInfoCard} = props
    console.log(data)

  return (
    <div className='dataCard'>
       
        <div className='hid-box'>
          <h4>{data.name}</h4>
        {data.description}
        {/* <button >add</button> */}
        </div>
        <div onClick={() => setShouldRenderDataInfoCard(false)} className='dataCard-close'><Clear /></div>
        </div>
  )
}

export default DataInfoCard