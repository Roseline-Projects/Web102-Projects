import { useState } from "react";
import { Link } from "react-router-dom";
import './charcard.css'

const CharCard = ({id, charName, accessory, charColor}) => {
    return(
        <>
            <div className='card-wapper'>
                <Link to={`/charDetails/${id}`} className='card-link'>
                    <div className="char-card">
                        <h6>Name: {charName}</h6>
                        <img src='crewmate.png'></img>
                        <h6>Accessory: {accessory}</h6>
                        <h6>Color: {charColor}</h6>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default CharCard