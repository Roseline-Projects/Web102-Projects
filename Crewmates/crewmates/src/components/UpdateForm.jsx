import { useState } from "react";
import CreateForm from "./CreateForm";

const UpdateForm = ({charDetails}) => {
    return (
        <div>
            <div className="curr-info-container">
                <h2>Current Info:</h2>
                <h3>Name: {charDetails.charName} Accessory: {charDetails.accessory} color: {charDetails.charColor}</h3>
            </div>
            <div className="new-info-form-container">
                <CreateForm type='alter'/>
            </div>


        </div>
    )
}

export default UpdateForm