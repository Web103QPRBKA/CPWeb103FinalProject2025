import { useState, useEffect } from 'react'
import { useRoutes, Link } from 'react-router-dom'
// import PlaceHolder from './pages/PlaceHolder'

import './css/App.css'

const App = () => {
  
  

  let element = useRoutes([
    // {
    //   path: "/",
    //   element: <Games data={games} />,
    // },
    // {}
  ]);

  return ( 
    <div className='App'>

      <div className='header'>
        <h1>Logic Puzzle</h1>
        <Link to='/'><button className='headerBtn'>Explore Games</button></Link>
      </div>

        {element}
    </div>

  )
}

export default App
