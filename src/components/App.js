import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";
import { getAuth, updateProfile } from "firebase/auth";


function App() {
  const [init, setInint] = useState(false);

  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
        });
        // setUserObj(user);
      }else{
        setInint(false);
      }

      setInint(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    // setUserObj(Object.assign({}, user));
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
    });
  }
  

  return (
    <>
      {init ?  <AppRouter refreshUser={refreshUser} isLoggedIn={init} userObj={userObj} /> : "Initializing"}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
    );
}

export default App;
