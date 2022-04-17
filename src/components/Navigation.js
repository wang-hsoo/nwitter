import React from "react";
import {Link} from "react-router-dom";


const Navigation = ({userObj}) => (
    <ul>
        <li>
            <Link to ="/">Home</Link>
        </li>
        <li>
            <Link to ="/Profile">{userObj.displayName} Profile</Link>
        </li>
    </ul>
);

export default Navigation;