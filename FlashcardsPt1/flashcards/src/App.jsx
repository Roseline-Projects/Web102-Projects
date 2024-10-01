import { useState } from 'react'
import './App.css'
import Flashcard from '../components/Flashcard'
import { cardInfo } from './Data'
// import { handleFlip, isFlipped }  from "../components/Flashcard"

function App() {
  const [cardCount, setCardCount] = useState(0)

  const handleNext = () => {
    // if(isFlipped) {
    //   handleFlip()
    //   console.log('here')
    // }
    setCardCount(Math.floor(Math.random() * (cardInfo.length)))
  }

  return (
    <>
      <div className='body-container'>
        <div className='heading-container'>
          <h1 id='title'>Random Internet/Media Trivia :D</h1>
          <h2 id='card-count'>Total Cards: <span>12</span></h2>
          <p id='set-desc'>Card set of miscellaneous trivia mostly relating to internet culture, games, and anime.</p>
        </div>

        <div className='card-container'>
          <Flashcard question={cardInfo[cardCount]["question"]} answer={cardInfo[cardCount]["answer"]}></Flashcard>
          <button id='next-button' onClick={handleNext}>Next</button>
        </div>
      </div>
    </>
  )
}

export default App
