import { useState } from 'react'
import './App.css'
import Flashcard from '../components/Flashcard'
import { cardInfo } from './Data'

function App() {
  const [cardCount, setCardCount] = useState(0)
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [countCorrect, setCountCorrect] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  let order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const initializeOrder = () => {
     console.log('Order shuffled. New order:')
     order = order.map((place) => place = Math.floor(Math.random() * (cardInfo.length)))
     console.log(order)
  }

  const handleNext = () => {
    setAnswer("")
    setIsCorrect(false)

    if(cardCount == cardInfo.length-1)
      setCardCount(0)
    else
      setCardCount(cardCount+1)
    console.log(order)
  }

  const handlePrev = () => {
    if(cardCount == 0)
      setCardCount(cardInfo.length-1)
    else
      setCardCount(cardCount-1)
  }

  const handleAnswer = (e) => {
    setAnswer(e.target.value)
  }

  const checkAnswer = (e) => {
    e.preventDefault()
    if(answer == cardInfo[cardCount]['answer']) {
      setIsCorrect(true)
      setCountCorrect(countCorrect+1)
      handleStreak(countCorrect + 1)
    } else {
      setIsCorrect(false)
      setCountCorrect(0)
    }

  }

  const handleStreak = (count) => {
    if(count > longestStreak)
      setLongestStreak(count)
  }

  return (
    <>
      <div className='body-container'>
        <div className='heading-container'>
          <h1 id='title'>Random Internet/Media Trivia :D</h1>
          <h2 id='card-count'>Total Cards: <span>12</span></h2>
          <p id='set-desc'>Card set of miscellaneous trivia mostly relating to internet culture, games, and anime.</p>
          <p id='longest-streak'>Longest Streak: {longestStreak}</p>
        </div>

        <div className='card-container'>
          <Flashcard question={cardInfo[order[cardCount]]["question"]} answer={cardInfo[order[cardCount]]["answer"]}></Flashcard>
          <div>
          <button className='control-button' onClick={handlePrev}>Prev</button>
          <button class='control-button' onClick={handleNext}>Next</button>
          </div>
        </div>
        <div className='input-container'>
          <form>
            <label> Guess: 
            <input name='user-guess' type='text' value={answer} onChange={handleAnswer} className={`${isCorrect ? "correct-ans" : 'wrong-ans'}`}/>
          <button type='submit' className='check-button' onClick={checkAnswer}>Check</button>
            </label>
            <div>
              <p>Streak: {countCorrect}</p>
            </div>
          </form>

          {/* <button onClick={initializeOrder}>Shuffle Deck</button> */}

        </div>

      </div>
    </>
  )
}

export default App
