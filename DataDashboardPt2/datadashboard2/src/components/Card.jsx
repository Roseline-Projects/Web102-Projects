import React from "react";
import { useState } from "react";
import './card.css'

//ideas:
    //pass in a handleUpdate function to this component
    //when a submit event occurs in the app component,
    //update the state of the card component

const Card = ({cardData, handleUpdate}) => { //cardData is an object containing the card's header and value
    return (
        <div className="card-card">
            {
                cardData && 
                Object.entries(cardData).map(([header, value]) => (
                    <div>
                        <h3 className="val">{value}</h3>
                    </div>
                ))           
            }
        </div>
    )

}

export default Card