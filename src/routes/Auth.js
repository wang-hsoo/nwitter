import { authService } from "fbase";
import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => {
        const {target : {name,value} } = event;

        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        let data;
        try{
            
            if(newAccount){
                //crate account
                data = await createUserWithEmailAndPassword(
                    authService, email, password
                );

                console.log(data);
            }else{
                //Log in
                data = await signInWithEmailAndPassword(
                    authService, email,password
                );

            
                
            }
        }catch(error){
            console.log(error);
        }
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name ="email"
                    type="email" 
                    placeholder="Eamil" 
                    required 
                    value={email}
                    onChange={onChange}
                    />

                <input 
                    name="password"
                    type="password"
                    placeholder="password" 
                    required  
                    value={password}
                    onChange={onChange}
                    />


                <input type="submit" value ={newAccount ? "Create Account" : "Log In"} />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;