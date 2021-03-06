import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";
import { Redirect } from "react-router-dom";


const AppRouter =  ({refreshUser, isLoggedIn,userObj}) => {

      return(
          <Router>
              {isLoggedIn && <Navigation userObj = {userObj}/>}
              <Switch>
                  {isLoggedIn ? (
                  <>
                    <Route exact path="/">
                        <Home userObj = {userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj = {userObj} refreshUser= {refreshUser}/>
                    </Route>
                    
                  </>) : (
                  <>
                    <Route exact path="/">
                        <Auth/>
                    </Route>
                    
                  </>
                  )}
              </Switch>
          </Router>
      )
  };

  export default  AppRouter;