import { async } from "@firebase/util";
import { authService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";

export default ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;

        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        if (userObj.displayName !== newDisplayName) {
          await updateProfile(auth.currentUser, {
            displayName: newDisplayName,
          });
          refreshUser();
        }
      };

    


    return(
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Display name" onChange={onChange} value ={newDisplayName}/>
            <input type="submit" value="Udate Profile" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};

