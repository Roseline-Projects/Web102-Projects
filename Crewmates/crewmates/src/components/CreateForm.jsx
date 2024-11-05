import { useState } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import './createform.css'

const CreateForm = ({type}) => { //type indicates whether the form is for new char creation or char update
    //new = create new character
    //edit = alter an existing character

    //-----------------
    //constants
    const colors = [
        "Red", "Blue", 'Green', 'Cyan', 'Brown', 
        'Purple', 'White', 'Gray', 'Yellow',
        'Orange', 'Pink',
    ]

    //Input states
    const [charName, setCharName] = useState("")
    const [accessory, setAccessory] = useState("")
    const [charColor, setCharColor] = useState("")

    //Output state
    const [charInputs, setCharInputs] = useState(null)

    //Input handling
    const handleNameInput = (e) => {
        setCharName(e.target.value)
    }
    
    const handleItemInput = (e) => {
        setAccessory(e.target.value)
    }

    const handleColorInput = (e) => {
        setCharColor(e.target.value)
    }

    //Submission
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     if(type == 'new') {
    //         setCharInputs({
    //             charName: charName,
    //             charAccessory: accessory,
    //             charColor: charColor,
    //         })
    //     } else {
    //         //handle either update or deletion
    //     }

    // }

    const createCharacter = async (e) => {
        e.preventDefault()
        await supabase
            .from('Characters')
            .insert({name: charName, accessory: accessory, color: charColor})
            .select()

        window.location = '/gallery' //sends you back to the home page
    }

    const params = useParams()
    const updateCharacter = async (e) => {
        e.preventDefault()
        //console.log(e)
        await supabase
        .from('Characters')
        .update({name: charName, accessory: accessory, color: charColor})
        .eq('id', params.character)

        window.location = '/gallery'
    }

    const deleteCharacter = async (e) => {
        e.preventDefault()

        await supabase
        .from('Characters')
        .delete()
        .eq('id', params.character)

        window.location = '/gallery'
    }

    return(
        <div className="form-container">
            {
                type == 'edit' ? (<div><h1>Edit</h1></div>) : (<div></div>)
            }
            <form className="form-list" /*onSubmit={type == 'new' ? createCharacter : updateCharacter} */>
                <label>
                    Name
                    <input 
                    type='text'
                    value={charName}
                    placeholder="Type a name..." 
                    onChange={handleNameInput}/>
                </label>
                <label>
                    Color
                        <input list='colors' name='characterColor' onChange={handleColorInput} placeholder="Pick a color..." />
                        <datalist id='colors'>
                            <option value='Red' />
                            <option value='Yellow' />
                            <option value='Orange' />
                            <option value='Blue' />
                            <option value='Purple' />
                            <option value='Green' />
                        </datalist>
                    {/* <input 
                    type='radio'
                    id={}
                    value={}
                    checked={colorSelect == {}}
                    onChange={handleColorInput} /> */}
                </label>
                <label>
                    Accessory
                    <input
                    type='text'
                    value={accessory}
                    placeholder="Give them an item!"
                    onChange={handleItemInput} 
                    />
                </label>
            </form>
            <div className="submission-buttons">
                {
                    type == 'new' ? (
                        <button type='submit' onClick={createCharacter}>Create</button>
                    ) : (
                        <div>
                            <button type='submit' onClick={updateCharacter}>Update Crewmate</button>
                            <button type='submit' onClick={deleteCharacter}>Delete Crewmate</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CreateForm