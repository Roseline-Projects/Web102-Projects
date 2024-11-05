import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import CreateForm from './CreateForm'
import './chardetail.css'

const CharDetails = () => {
    let params = useParams()

    const [currentChar, setCurrentChar] = useState(null)

    useEffect(() => {
        const getCharacter = async () => {
            const {data} = await supabase
            .from('Characters')
            .select()
            .eq('id', params.character)

            //console.log(data)

            setCurrentChar(data[0])
        }

        getCharacter()

    }, [params.id])


    return(
        currentChar ? (
            <div className="char-details-view">
                <h1>{currentChar.name}</h1>
                <h3>Color: {currentChar.color}</h3>
                <h4>This one has a <span>{currentChar.accessory}!</span></h4>
                <Link to={`/edit/${currentChar.id}`}>
                    <button>Edit Crewmate</button>
                </Link>
            </div>
        ) : (
            <div>
                <h2>Loading...</h2>
            </div>
        )
    )
}

export default CharDetails