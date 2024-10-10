import { useState } from 'react'
import './App.css'

function App() {

  const [inputs, setInputs] = useState({ 
    keywords:'APOLLO 11 FLIGHT,MOON,LUNAR SURFACE', //use dict of keywords? that way, u can just remove key when banned
    location:'',
    media_type:'image',
    page_size: 1 
  }) 
  const [request, setRequest] = useState(null)

  const handleRequest = (e) => {
    e.preventDefault()


  }

  const makeRequest = () => {
    let query = `https://images-api.nasa.gov/search?keywords=${inputs.keywords}&location=${inputs.location}&media_type=${inputs.media_type}&page_size=${inputs.page_size}`
    
  }

  const callAPI = async (query) => {
    const response = await fetch(query)
    if(response.status == 200) {
      const json = await response.json()
      setRequest({ //change these to the keys they should be mapped to in the json output instead of empty
        center:'',
        date_created:'',
        description:'',
        keywords:[],
        title:'',
        href:'',
      })
    } else {
      alert("Something went wrong, let's try again.")
    }
  
  }

  return (
    <>
    <div>
      <h1>Veni Vidi (sans Vici)!</h1>
      <h2>Explore space with the click of a button!</h2>

      <button onClick={handleRequest}>Explore</button>
    </div>
      
    </>
  )
}

export default App
