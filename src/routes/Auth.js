import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    } from "firebase/auth";
  

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

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
            setError(error.message);
        }
    }

    const toggleAccount  = () => setNewAccount((prev) => !prev);
    const onSocialClick = async(event) => {
        const {target: {name},} = event;
        let provider;

        if(name === "google"){
            provider = new GoogleAuthProvider(); 
        }else if(name === "github"){
            provider = new GithubAuthProvider();
        }

        await signInWithPopup(authService, provider);
        const data = await signInWithPopup(authService, provider);
    };


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
                {error}
            </form>

            <span onClick={toggleAccount}> {newAccount ? "Login": "Create Account"}</span>

            <div>
                <button onClick = {onSocialClick} name = "google">Continue with Google</button>
                <button onClick = {onSocialClick} name = "github">Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;