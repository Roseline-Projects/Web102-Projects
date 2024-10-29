import React, { Component, useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    Rectangle,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label,
    Legend,
    ResponsiveContainer
  } from "recharts";

const BrewChart = ({freqDist}) => {
    //idea: bar chart of the number of each brewery type in the given state

    //freqdist format:
        /*

        {
            city: count,
            city: count,
            city: count,
        }

        */

    const [data, setData] = useState(null)

    useEffect(() => {
        const extractData = () => {
            console.log('Frequencies: ', freqDist)
            let dataHolder = []
            let keys = Object.keys(freqDist)
            for(let j = 0; j < keys.length; j++) { //restructure freqdist into array of objects
                //each object is a city: value pair
                //refactor the data so they're type: value pairs :skull:
                dataHolder[j] = {
                    name: keys[j],
                    BreweryCount: freqDist[keys[j]]
                }
            }
    
            console.log("extracted data: ", dataHolder)
            setData(dataHolder)
        }

        extractData()

    }, [freqDist])


    return (
        <div style={{color: "black"}}>
            {freqDist ? (
                <div>
                    <ResponsiveContainer width="100%" height="100%" minHeight={300} minWidth={600}>
                        <BarChart width={300} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar label dataKey='BreweryCount' fill="#D2B450"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ): null}
        </div>
    )
}

export default BrewChart