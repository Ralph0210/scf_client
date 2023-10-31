import React from 'react'
import './Interests.css'
import Interest from '../Interest/Interest'


const Interests = ({topics, setTopics, isDataLoaded}) => {
  return (
    <div className='interests_container'>
      
        <div className='title_description'>
            <h1>What interests you?</h1>
            <p>Selected Topics that you are interested. Variables in the SCF that's related to your interests will be highlighted.</p>
        </div>
        <Interest topics={topics}  setTopics={setTopics} isDataLoaded={isDataLoaded}/>
    </div>
  )
}

export default Interests