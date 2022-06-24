import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar-div">
    <div>
        <Link className='nav-buttons' to='/'>Home</Link>
        <Link className='nav-buttons' to='/favourites'>Favourites</Link>
    </div>

    <div>
      <Link to='/login' className='nav-buttons'>Login</Link>
    </div>
  </div>
  )
}

export default Navbar