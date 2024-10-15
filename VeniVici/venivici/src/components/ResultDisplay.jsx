import React from "react";
import { useState } from "react";
import './resultdisplay.css'

const ResultDisplay = ({request, handleBan}) => {
    return(
        <div className="result-container">
            <div className="attributes-container">
                {/*console.log('The rest sent to display is ', request) */}
                {console.log('----------------------------------------------------------------------')}
                {
                    request.keywords &&
                    request.keywords.map((keyword) => (
                        <li className="button-holder" key={keyword}>
                            <button className="keyword-button">{keyword}</button>
                        </li>
                    ))
                }
                {
                    request.dateCreated ? (
                            <li className="button-holder">
                                <button className="keyword-button">Date created: {request.dateCreated}</button>
                            </li>
                    ) : (
                        <div></div>
                    )
                }
                {
                    request.center ? (
                            <li>
                                Center: <span></span>
                                <button className="button-holder" onClick={handleBan}>{request.center}</button>
                            </li>
                        
                    ) : (
                        <div></div>
                    )
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