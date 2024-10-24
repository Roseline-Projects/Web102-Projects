import React from "react";
import './resultslist.css'

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

                        <tr key={brewery.id} className="table-rows">
                            {
                                Object.entries(brewery).map(([category, value]) => (
                                    value != brewery.id ? (
                                    <td>                                        
                                          {value}                                      
                                    </td>
                                    ) : (
                                        ''
                                    )
                                ))
                            }
                        </tr>

                    ))

                }
                </tbody>
            </table>
        </div>
    )
    
}

export default ResultsList