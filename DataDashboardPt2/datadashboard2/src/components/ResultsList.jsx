import React from "react";
import './resultslist.css'
import { Link } from "react-router-dom";

const ResultsList = ({brewsList}) => { //brewsList is an array of objects, each object is a brewery
    return (
        <div className="results-table-container">
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Type</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                {

                    brewsList && brewsList.map((brewery) => (

                        // <Link style={{color: "white"}}
                        //     to={`/LocationDetail/${brewery.id}`}
                        //     key={brewery.id}
                        // >
                        <tr key={brewery.id} className="table-rows">
                            {
                                Object.entries(brewery).map(([category, value]) => (
                                    value != brewery.id ? (
                                    <td>  
                                        {
                                            value == brewery.name ? (
                                                <Link style={{color: "white"}}
                                                    to={`/LocationDetail/${brewery.id}`}
                                                    key={brewery.id}
                                                >
                                                   <p>{value}</p>
                                                </Link>
                                            ) :
                                            (
                                                <p>{value}</p>
                                            )
                                        }                                      
                                    </td>
                                    ) : (
                                        ''
                                    )
                                ))
                            }
                        </tr>
                        //</Link>

                    ))

                }
                </tbody>
            </table>
        </div>
    )
    
}

export default ResultsList