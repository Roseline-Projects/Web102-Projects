import React from "react";
import { useState } from "react";
import './resultdisplay.css'

const ResultDisplay = ({request}) => {
    return(
        <div className="result-container">
            <div className="attributes-containter">
                {
                    request &&
                    request.keywords.map((keyword) => (
                        <li className="button-holder" key={keyword}>
                            <button className="keyword-button">{keyword}</button>
                        </li>
                    ))
                }
            </div>
            <div className="contents-container">
                <h2 className="req-title"> {request.title}</h2>
                <img className="req-img" src={request.href}></img>
                <h5 className="req-desc">{request.description}</h5>
            </div>
        </div>
    )

}

export default ResultDisplay