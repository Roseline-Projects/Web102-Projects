import "./flashcard.css"
import { useState } from "react"

function Flashcard(props) {
    const[isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <div className="contents-container" onClick={handleFlip}>
            <div className="card-text-container">
                {
                    isFlipped ? <p>{props.answer}</p> : <p>{props.question}</p>
                }
            </div>
        </div>
    )
}

export default Flashcard