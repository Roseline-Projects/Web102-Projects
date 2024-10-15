import React from "react";
import './banlist.css'

const BanList = ({bannedCenters, handleRemoveBan}) => {
    return (
        <div className="ban-list-bkg">
            <div className="upper-desc">
                <h3>Ban List</h3>
                <h5>Select a space center to add it to the ban list and stop recieving pictures from there.</h5>
            </div>
            <div className="bans-holder">
                {bannedCenters ? (
                    <div className="banned-items-container">
                        {
                        bannedCenters &&
                        bannedCenters.map((center) => (
                            <li key={center}> 
                                <button className="banned-center-button" onClick={handleRemoveBan}>{center}</button>
                            </li>
                        ))
                        }
                    </div>
                ) : (
                    <div>

                    </div>
                )
                
                }


            </div>
        </div>

    )

}

export default BanList