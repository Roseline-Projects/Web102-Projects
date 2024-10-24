import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import Card from './components/Card'
import ResultsList from './components/ResultsList'

function App() {

  //Query States---------------
  const [input, setInput] = useState('')
  const [filters, setFilters] = useState(null)
  const [brewsList, setBrewsList] = useState(null) //brewsList is an array of objects, each object is a brewery
  const [cardDataList, setCardDataList]  = useState([]) //array of data for all cards, where each list item is an object
  const [prevList, setPrevList] = useState(null)
  //---------------------------

  //Inputs and filters states----------------
  const [nameInput, setNameInput] = useState(null)
  //const [stateInput, setStateInput] = useState(null)
  const [typeInput, setTypeInput] = useState(null)
  //---------------------------

  //Dashboard stats---------------------------
  //const [totalLocations, setTotalLocations] = useState(0)
  const [currState, setCurrState] = useState('')
  const [cardStats, setCardStats] = useState(null)
  //------------------------------------------

  //========================================================================================================================
  //Input and filtering methods
  const handleNameInput = (e) => {
    let val = e.target.value
    setNameInput(val)
    setFilters({name: val})
    
  }

  const handleStateInput = (e) => {
    setInput(e.target.value)
  }

  const handleTypeInput = (e) => {
    let val = e.target.value
    setTypeInput(val)
    setFilters({type: val})
  }

  const searchItems = () => {
    if(filters != null) {
      let filter = Object.keys(filters)[0]

      if(filters[filter] == "") {
        setBrewsList(prevList)
        return
      }

      let filtered = prevList.filter(brewery => brewery[filter] == filters[filter])
      setBrewsList(filtered)
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(input != '') {
      //console.log('input 1')
      setCurrState(input)
      callAPI()
      setInput('')
    } else {
      //console.log('input 2')
      searchItems()
    }
  }

  //========================================================================================================================
  //Query methods
  const cleanData = (brewery) => {
    let cleanedBrewery = {
      name: brewery.name,
      city: brewery.city,
      address: brewery.address_1,
      phone: brewery.phone,
      type: brewery.brewery_type,
      site: (brewery.website_url == null ? 'N/A' : brewery.website_url),
      id: brewery.id,
    }
    return cleanedBrewery
  }

  //render default values on page load
  useEffect(() => {
    const fetchFloridaData = () =>  {
      setCurrState("Florida")
      callAPI()
    }
    fetchFloridaData()
  }, [])
  //-------------------------------------------------------------------------------------------------------

  const callAPI = async () => {
    let query = `https://api.openbrewerydb.org/v1/breweries?by_state=${input == '' ? 'Florida' : input}&per_page=200`
    const response = await fetch(query)
    const json = await response.json()
    let cleanedData = json.map(brewery => cleanData(brewery))
    setBrewsList(cleanedData)
    setPrevList(cleanedData)
  }

  useEffect(() => {
    if(brewsList != null) {
      console.log("brewslist on use effect: ", brewsList)
      let totalLocationsTest = (brewsList.length == 200? '200+' : brewsList.length)
      let state = currState
      let loc = findMostLocations()

      setCardDataList((prevState) => (
        [
          {
            header: "State",
            value: state
          },
          {
            header: "Most Locations",
            value: loc
          },
          {
            header: "Total Locations",
            value: totalLocationsTest
          }
        ]
      ))
    }

  }, [brewsList])

  const findMostLocations = () => {
      //Create a freq distribution with maps

      let freqdist = {}
      
      for(let i = 0; i < brewsList.length; i++) {
        if(freqdist[brewsList[i].city] == undefined) {
          freqdist[brewsList[i].city] = 1

        } else {
          freqdist[brewsList[i].city]++

        }
      }

      let keys = Object.keys(freqdist)
      let max = keys[0]
      for(let j = 0; j < keys.length; j++) {
        if(freqdist[keys[j]] > freqdist[max]) {
          max = keys[j]
        }
      }
      
      return max;

  }


//---------------------------------------------
  const updateCards = () => {

    //console.log(brewsList)
    setTotalLocations(brewsList.length)
    console.log('total locations ', totalLocations)
  }

  return (
    <div className='page-wrapper'>
      <div className='dash-container'>
        <div className='header-container'>
          <h1>Brewery Stats</h1>
          <h4>Check out American breweries by state.</h4>
        </div>
        <div className='stats-container'>
          {
            cardDataList && cardDataList.map(cardData =>
              <Card cardData={cardData} />
            )
          }

        </div>
        <div className='results-container'>
          <div className='filters'>
            <form onSubmit={handleSubmit}>
              <labal> Brewery Name:
                <input type='text' name='brew-name' onChange={handleNameInput} placeholder='Enter a name...'></input>
              </labal>

              <labal> State:
                <input type='text' onChange={handleStateInput} placeholder='Enter a state...'></input>
              </labal>

              <labal> Type:
                <input list='types' name='brew-types' onChange={handleTypeInput} placeholder='Select a type...'></input>
              </labal>
              <datalist id='types'>
                <option value='micro'/>
                <option value='regional' />
                <option value='large' />
                <option value='brewpub' />
                <option value='planning' />
                <option value='bar' />
                <option value='contract' />
                <option value='proprietor' />
                <option value='closed' />
              </datalist>
              <button type='submit'>Search</button>
            </form>

          </div>
          <div className='results'>
            <ResultsList brewsList={brewsList}/>
          </div>

        </div>
      </div>
      <div className='decorative-img-container'>
        <img src='site-img-1-brew.jpg' className='site-img'></img>
      </div>
    </div>
  )
}

export default App