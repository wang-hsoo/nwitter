import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet =({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok){
            //delete nweet
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };

    const toggelEditing = () => setEditing((prev) => !prev);

    const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
           text: newNweet, 
        });

        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;

        setNewNweet(value);
    }

    return(
        <div>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input 
                                type="text" 
                                value={newNweet} 
                                placeholder = "Edit your nweet"
                                onChange = {onChange} 
                                require />
                            <input type ="submit" value="Update Nweet" />
                        </form>
                        <button onClick={toggelEditing}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggelEditing}>Edit Nweet</button>
                        </>
                        )}
                    </>
                )
            }
        </div>
    )
    
}

export default Nweet;