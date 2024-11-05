import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <div className='main-body'>
        <h1>Create a Crewmate!</h1>
        <img src='crewmate.png'></img>
        <h3>Get started below.</h3>
        <Link to='/create'>
          <button>Create!</button>
        </Link>
      </div>
    </>
  )
}

export default App
