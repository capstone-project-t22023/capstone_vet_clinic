//React imports
import React, {useEffect, useState} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProgramContext from './ProgramContext';

//Theme import
import {ThemeProvider,CssBaseline} from "@mui/material";
import theme from "./theme";

//Pages import
import DefaultPage from './pages/DefaultPage';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Signup from './pages/Signup';
//Components import
import Protected from './components/Protected';
import Logout from './components/authorization/Logout';
import TrialForm from './components/forms/TrialForm';
import ConfirmSignup from './components/authorization/ConfirmSignup';




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
                if (data[0].user) {
                    let tmp = data[0].user;
                    tmp.role = 'admin';
                    setUser(tmp);
                    setAuthenticated(true);
                    sessionStorage.setItem('user', JSON.stringify(tmp));
                } else if (data[1].user) {
                    let tmp = data[1].user;
                    tmp.role = 'doctor';
                    setUser(tmp);
                    setAuthenticated(true);
                    sessionStorage.setItem('user', JSON.stringify(tmp));
                } else if (data[2].user) {
                    let tmp = data[2].user;
                    tmp.role = 'pet_owner';
                    setUser(tmp);
                    setAuthenticated(true);
                    sessionStorage.setItem('user', JSON.stringify(tmp));
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
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <BrowserRouter>
                            <Routes>
                                <Route index element={ <Home/> }/>
                                <Route
                                    path="/dashboard"
                                    element={
                                        <Protected isLoggedIn={authenticated}>
                                            <Dashboard/>
                                        </Protected>
                                    }
                                />

                                <Route path="/logout" element={<Logout/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/signup" element={<Signup/>}/>
                                <Route path="/confirm" element={<ConfirmSignup/>}/>

                                {/*USER PET OWNER LINKS*/}
                                <Route path="/bookings" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <Bookings/>
                                    </Protected>
                                }/>
                                <Route path="/profile" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <Profile/>
                                    </Protected>
                                }/>

                                <Route path="/trialform"
                                       element={
                                           <Protected isLoggedIn={authenticated}>
                                               <TrialForm/>
                                           </Protected>
                                       }
                                />

                                <Route
                                    path="*"
                                    element={<DefaultPage/>}
                                />
                            </Routes>
                        </BrowserRouter>
                    </ThemeProvider>
                </ProgramContext.Provider>
            </HelmetProvider>
        </div>
    );
}

export default App;