import React, {Component, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import './locationdetail.css'

const LocationDetail = () => {
    const [fullDetails, setFullDetails] = useState(null)
    const [locId, setLocId] = useState("")
    
    let params = useParams()
    useEffect(() => {
        console.log("params: ", params)
        const getLocDetails = async () => {
            const details = await fetch(`https://api.openbrewerydb.org/v1/breweries/${params.loc}`)
            const locDetails = await details.json()
            console.log("locDetails result: ", locDetails)
            setFullDetails({
                name: locDetails.name,
                type: locDetails.brewery_type,
                address: locDetails.address_1,
                zip: locDetails.postal_code,
                city: locDetails.city,
                state_province: locDetails.state_province,
                country: locDetails.country,
                phone: locDetails.phone,
                site: locDetails.website_url == null ? "N/A" : locDetails.website_url,
            })
            setLocId(locDetails.id)
            console.log("full details: ", fullDetails)
            console.log("ID: ", locId)
        }
    
        getLocDetails().catch(console.error)
    }, [params.loc])


    return(
        <div className='loc-page-wrapper'>
            <div className='loc-wrapper'>
                    {
                        fullDetails ? (
                            <h3>Details on {fullDetails.name}:</h3>
                        ) : (
                            <h3>Retrieving Info...</h3>
                        )
                    }
                <ul>
                    {
                        fullDetails &&
                        Object.entries(fullDetails).map(([category, value], index) => (
                            <li key={category} className='loc-detail'>
                                {category}: {value}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='decorative-img-container'>
                <img src='..\site-img-1-brew.jpg' className='side-img'></img>
            </div>

        </div>
        
    )
}

export default LocationDetail