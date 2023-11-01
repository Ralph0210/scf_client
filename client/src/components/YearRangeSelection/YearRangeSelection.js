import React, { useState } from 'react';
import ReactSlider from 'react-slider'
import './YearRangeSelection.css'
import styled from 'styled-components';


const StyledSlider = styled(ReactSlider)`
width: 25rem;
height: 2.5rem;
`;

const StyledThumb = styled.div`
height: 25px;
line-height: 80px;
width: 25px;
text-align: center;
background-color: #FFFFFF;
color: #000;
border-radius: 50%;
cursor: grab;
`;

const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
top: 1.1rem;
bottom: 1.1rem;
background: ${props => (props.index === 2 ? '#DBE2EA' : props.index === 1 ? '#7C9CBF' : '#DBE2EA')};
border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;




const YearRangeSelection = (props) => {
  const {value, setValue} = props;
  return (
    <div>
      {/* <StyledSlider max={2019} min={2010} step={3} minDistance={3} defaultValue={[2010, 2019]} renderTrack={Track} renderThumb={Thumb} /> */}
      <StyledSlider
    value={value}
    onAfterChange={(value, index) => setValue(value,index)
    }
    // className="horizontal-slider"
    // thumbClassName="example-thumb"
    // trackClassName="example-track"
    // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    max={2019} min={1989} step={3} minDistance={3} defaultValue={[1989, 2019]} renderTrack={Track} renderThumb={Thumb}
/>
    </div>
  )
}

export default YearRangeSelection;
