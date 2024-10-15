import { useState } from 'react'
import './App.css'
import ResultDisplay from './components/ResultDisplay'
import BanList from './components/BanList'


function App() {
  
  const [bannedCenters, setBannedCenters] = useState([])
  const [inputs, setInputs] = useState({
    media_type:'image',
    page_size: 1,
    bannedCenters: bannedCenters
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
    console.log('The random number selected is' + inputNum)
    callAPI()

  }

  const callAPI = async () => {
    let valid = true
    let count = 0 //only call the api 3 times max per click

    do {
    let query = `https://images-api.nasa.gov/search?media_type=image&page=${inputNum}&page_size=1`
    if(bannedCenters.length != 0) {
      valid = false
      //console.log('page size is ', inputs.page_size)
      //query = `https://images-api.nasa.gov/search?media_type=${inputs.media_type}&page_size=${inputs.page_size}`
    }
    const response = await fetch(query)
    if(response.status == 200) {
      count++
      const json = await response.json()
      
      let i = 0; //index of the image selected in the returned array
      if(bannedCenters.length != 0) {
        console.log('Banned centers found, json output changed', json)
        console.log("banned centers right now ", bannedCenters)
        let imageSet = json.collection.items //collection of nasa images
        if(!bannedCenters.includes(json.collection.items[i].data[0].center)) { //selects the first returned image that isn't banned
            console.log('type of banned center ', typeof bannedCenters[0])
            console.log('type of center ', typeof json.collection.items[i].data[0].center)
            console.log('valid center: ', json.collection.items[i].data[0].center)
            valid = true
        }
        
        if(valid == false) { //try a different page
          randNum()
        }
      }

      setRequest((prevState) => ({
          ...prevState,
          center: json.collection.items[i].data[0].center,
          dateCreated: json.collection.items[i].data[0].date_created,
          description: json.collection.items[i].data[0].description,
          keywords: json.collection.items[i].data[0].keywords,
          title: json.collection.items[i].data[0].title,
          href: json.collection.items[i].links[0].href,
        }))
        console.log('Json: ', json)
        console.log('Request: ', request)
      
    } else {
      alert("Something went wrong, let's try again.")
    }
    } while (valid == false && count <= 3)

  }

  //-------------------------------------------------------------------

  const handleBan = (e) => {
    setBannedCenters(bannedCenters => [...bannedCenters, e.target.innerText])
    setInputs((prevState) => (
      {
        ...prevState,
        page_size: 10,
      }
    ))
    console.log(bannedCenters)
  }

  const handleRemoveBan = (e) => {
    //setBannedCenters(bannedCenter => [bannedCenter != e.target.innerText])
    setBannedCenters(bannedCenters.filter(center => center != e.target.innerText))
    console.log('Banned centers', bannedCenters)
  }

  //-------------------------------------------------------------------

  return (
    <div className='page-container'>
    <div className='discover-container'>
      <h1 className='page-title'>Veni Vidi!</h1>
      <h2>Explore space with the click of a button!</h2>
      {
        request ? (
          <ResultDisplay request={request} handleBan={handleBan}/>
        ) : (
          <div></div>
        ) 
      }
      <button onClick={handleRequest}>Explore</button>
    </div>
    <div className='banlist-outer-container'>
      <BanList bannedCenters={bannedCenters} handleRemoveBan={handleRemoveBan}/>
    </div>
      
    </div>
  )
}

export default App
