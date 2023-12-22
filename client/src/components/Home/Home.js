import React, {useRef, useState} from 'react'
import './Home.css'
import Hero from '../Hero/Hero'
import Instruction1 from '../Instruction1/Instruction1'
import Interests from '../Interests/Interests'
import DiscoverButton from '../DiscoverButton/DiscoverButton'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Home = ({topics, setTopics, isDataLoaded}) => {
  const InstructionRef = useRef(null)
  const [toggleAlert, setToggleAlert] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

const Alert = () => (
  <div className='alert'>
  <img src='/desktopIcon.png'/>
  <p>Your screen will be too small for the analysis page</p>
  <p>Please access this website from a desktop device.</p>
  <span onClick={() => setIsDismissed(true)}>dismiss</span>
  </div>
);
  return (
    <>
    {!isDismissed && (<div className='alert_screen_size' onClick={() => setToggleAlert(!toggleAlert)}>
      <div className='notification_container'>
      {!toggleAlert && (<img src='/notification1.png' />)}
      
      {toggleAlert && (<Alert />)}
      </div>
    </div>)}
    
      <Hero InstructionRef={InstructionRef}/>
      <Instruction1 ref={InstructionRef}/>
      <Interests topics={topics}  setTopics={setTopics} isDataLoaded={isDataLoaded}/>
      <DiscoverButton topics={topics}/>
      <Footer />
    </>
  )
}

export default Home