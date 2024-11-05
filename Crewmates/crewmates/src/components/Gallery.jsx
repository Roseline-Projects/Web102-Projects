import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CharCard from './CharCard'
import { supabase } from "../client";
import './gallery.css'

const Gallery = () => {
    const[charGallery, setCharGallery] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Characters')
                .select()
                .order('created_at', {ascending: true})

            setCharGallery(data)
        }
        fetchPosts()
    }, [charGallery])

    return(
        <div>
            <h1>Crewmate Gallery</h1>
            <div className="gallery-contents">
            {
                charGallery && charGallery.length > 0 ? (
                    charGallery.map((character, index) => (
                        <CharCard id={character.id} 
                            charName={character.name} 
                            accessory={character.accessory} 
                            charColor={character.color} />
                    ))
                   
                ) : (<h3>When you create a crewmate, it will show up here!</h3>)
            }
            </div>
            <Link to='/create'>
                <button>Create</button>
            </Link>
            
        </div>
        //When a crewmate card is clicked from the gallery component,
        //it should link to the crewmate's details page
    )
}

export default Gallery