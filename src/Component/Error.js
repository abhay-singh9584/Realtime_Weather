import React from 'react'
import "./Error.css"
import { Link } from 'react-router-dom'

function Error() {
  return (
    <main>
      <div className="error-container">
          <h1>Error</h1>
          <p>Oops! The city you are looking for cannot be found.</p>
          <Link className='home-button' to="/">Go Home</Link>
      </div>
    </main>
  )
}

export default Error