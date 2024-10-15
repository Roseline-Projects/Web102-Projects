import { useState } from 'react'
import './App.css'
import ResultDisplay from './components/ResultDisplay'


function App() {

  const [inputs, setInputs] = useState({ 
    keywords:'APOLLO 11 FLIGHT,MOON,LUNAR SURFACE', //use dict of keywords? that way, u can just remove key when banned
    location:'',
    media_type:'image',
    page_size: 1 
  }) 
  const [request, setRequest] = useState(null)
  const [inputNum, setInputNum] = useState(1)

  const randNum = () => {
    const max = 10000
    setInputNum(Math.floor(Math.random() * max))
  }

  const handleRequest = (e) => {
    e.preventDefault()
    randNum()
    console.log(inputNum)
    callAPI()

  }

  const callAPI = async () => {
    let realQuery = `https://images-api.nasa.gov/search?keywords=${inputs.keywords}&location=${inputs.location}&media_type=${inputs.media_type}&page_size=${inputs.page_size}`
    let query = `https://images-api.nasa.gov/search?media_type=image&page=${inputNum}&page_size=1`
    const response = await fetch(query)
    if(response.status == 200) {
      const json = await response.json()
      setRequest((prevState) => ({
        ...prevState,
        center: json.collection.items[0].data[0].center,
        description: json.collection.items[0].data[0].description,
        keywords: json.collection.items[0].data[0].keywords,
        title: json.collection.items[0].data[0].title,
        href: json.collection.items[0].links[0].href,
      }))
      console.log(json)
      console.log(request)
    } else {
      alert("Something went wrong, let's try again.")
    }
  }

  return (
    <>
    <div>
      <h1>Veni Vidi (sans Vici)!</h1>
      <h2>Explore space with the click of a button!</h2>
      {
        request ? (
          <ResultDisplay request={request}/>
        ) : (
          <div></div>
        ) 
      }
      <button onClick={handleRequest}>Explore</button>
    </div>
      
    </>
  )
}

export default App
