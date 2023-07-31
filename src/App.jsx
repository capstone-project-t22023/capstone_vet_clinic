//React imports
import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Local file imports
import Protected from './components/Protected';
import Home from './components/Home';
import DefaultPage from './components/DefaultPage';
import Logout from './components/authorization/Logout';
import Login from './components/authorization/Login';
import TrialForm from './components/forms/TrialForm';
import ConfirmSignup from './components/authorization/ConfirmSignup';
import Signup from './components/authorization/Signup';


import ProgramContext from './ProgramContext';

/**
 * 
 * Main file that renders all pages of the website
 * Uses Routes to map paths to components to be rendered
 * 
 * Uses Context API to help pass states and props throughout the system, key for user information transmission
 * Uses React Helmet to help label the tab names relative to the page content
 * 
 */

function App() {
  const helmetContext = {};
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost/capstone_vet_clinic/api.php/get_admin", {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        }),
      fetch("http://localhost/capstone_vet_clinic/api.php/get_doctor", {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        }),
      fetch("http://localhost/capstone_vet_clinic/api.php/get_pet_owner", {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        })
  ])
      .then((responses) => {
          return Promise.all(responses.map(function (response) {
              return response.json();
          }));
      })
      .then(data => {
        if(data[0].user){
          let tmp = data[0].user;
          tmp.role = 'admin';
          setUser(tmp);
          setAuthenticated(true);
          sessionStorage.setItem('user',JSON.stringify(tmp));
        }  else if(data[1].user){
          let tmp = data[1].user;
          tmp.role = 'doctor';
          setUser(tmp);
          setAuthenticated(true);
          sessionStorage.setItem('user',JSON.stringify(tmp));
        } else if(data[2].user){
          let tmp = data[2].user;
          tmp.role = 'pet_owner';
          setUser(tmp);
          setAuthenticated(true);
          sessionStorage.setItem('user',JSON.stringify(tmp));
        }
      })
      .catch(error => {
          console.error(error);
      });
  }, []);

  return (
    <div className="App">
        <HelmetProvider context={helmetContext}>
        <ProgramContext.Provider 
          value={{ 
            user, setUser,
            authenticated, setAuthenticated
          }}>
          <BrowserRouter>
                  <Routes>
                    <Route 
                      path="/" 
                      element={
                        <Protected isLoggedIn={authenticated}>
                          <Home />
                        </Protected>
                      } 
                    />
                    <Route 
                      path="/home"
                      element={
                        <Protected isLoggedIn={authenticated}>
                          <Home />
                        </Protected>
                      } 
                    />

                    <Route path="/logout" element={<Logout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/confirm" element={<ConfirmSignup />} />
                    
                    <Route path="/trialform" 
                    element={
                      <Protected isLoggedIn={authenticated}>
                        <TrialForm />
                      </Protected>
                    } 
                    />

                    <Route
                      path="*"                                    
                      element={<DefaultPage/>}
                    />
                  </Routes>
          </BrowserRouter>
          </ProgramContext.Provider>
        </HelmetProvider>
      </div>
  );
}

export default App;
