import React from 'react'
import './DiscoverButton.css'
import { Link } from 'react-router-dom'

const DiscoverButton = ({topics}) => {
  const n = topics.size

  return (
    <div className='discoverbuttoncontainer'>
      <div className="screen_too_small">
        <p>Your screen is too small!</p>
        <p>Please access this website from a desktop device.</p>
      </div>
        <Link to='/analyticsPage'><button className='discoverbutton'>Discover with {n} Topics</button></Link>
    </div>
  )
}

export default DiscoverButton