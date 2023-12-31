//React imports
import React, {useEffect, useState} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter, Routes, Route} from "react-router-dom";

//Providers import
import ProgramContext from './contexts/ProgramContext';
import {PetsProvider} from "./contexts/PetsProvider";

//Theme import
import {ThemeProvider, CssBaseline} from "@mui/material";
import theme from "./theme";

//Pages import
import DefaultPage from './pages/DefaultPage';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Signup from './pages/Signup';
import StaticLanding from './pages/StaticLanding';

//Components import
import Protected from './components/Protected';
import Logout from './components/authorization/Logout';
import TrialForm from './components/forms/TrialForm';
import ConfirmSignup from './components/authorization/ConfirmSignup';
import PetRecords from "./pages/PetRecords";
import Inventory from './pages/Inventory';
import Lodging from './pages/Lodging';
import GenerateInvoice from './components/billing/GenerateInvoice';
import InvoicePage from './components/billing/InvoicePage';
import InvoiceForm from './components/billing/InvoiceForm';
import ReceiptForm from './components/billing/ReceiptForm';
import PaymentPage from './components/billing/PaymentPage';
import InvoicePdf from './pdf_export/InvoicePdf';
import ReceiptPdf from './pdf_export/ReceiptPdf';
import PaymentHistory from './components/billing/PaymentHistory';
import UserManagement from "./pages/UserManagement";

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
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token') || updated ){
            Promise.all([
                fetch("http://localhost/capstone_vet_clinic/api.php/get_admin", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }),
                fetch("http://localhost/capstone_vet_clinic/api.php/get_doctor", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }),
                fetch("http://localhost/capstone_vet_clinic/api.php/get_pet_owner", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
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
                        if(tmp.role){
                            tmp.role = 'admin';
                        }
                        setUser(tmp);
                        setAuthenticated(true);
                        localStorage.setItem('user', JSON.stringify(tmp));
                    } else if (data[1].user) {
                        let tmp = data[1].user;
                        if(tmp.role){
                            tmp.role = 'doctor';
                        }
                        setUser(tmp);
                        setAuthenticated(true);
                        localStorage.setItem('user', JSON.stringify(tmp));
                    } else if (data[2].user) {
                        let tmp = data[2].user;
                        if(tmp.role){
                            tmp.role = 'pet_owner';
                        }
                        setUser(tmp);
                        setAuthenticated(true);
                        localStorage.setItem('user', JSON.stringify(tmp));
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
        setUpdated(false);
    }, [updated]);

    return (
        <div className="App">
            <HelmetProvider context={helmetContext}>
                <ProgramContext.Provider
                    value={{
                        user, setUser,
                        authenticated, setAuthenticated,
                        updated, setUpdated
                    }}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <BrowserRouter>
                            <Routes>

                                <Route path="/home" element={
                                    <StaticLanding/>
                                }
                                />
                                <Route path="/" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <PetsProvider>
                                            <Dashboard/>
                                        </PetsProvider>
                                    </Protected>
                                }
                                />
                                <Route path="/pet-records" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <PetsProvider>
                                            <PetRecords />
                                        </PetsProvider>
                                    </Protected>
                                }
                                />
                                {/*USER PET OWNER LINKS*/}
                                <Route path="/profile" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <Profile/>
                                    </Protected>
                                }/>

                                <Route path="/trialform" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <TrialForm/>
                                    </Protected>
                                }
                                />

                                <Route path="/print_invoice" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <InvoicePdf/>
                                    </Protected>
                                }
                                />

                                <Route path="/print_receipt" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <ReceiptPdf/>
                                    </Protected>
                                }
                                />

                                { user.role === "admin" ?
                                <>
                                <Route path="/inventory" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <Inventory />
                                    </Protected>
                                }
                                />

                                <Route path="/lodging" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <PetsProvider>
                                            <Lodging />
                                        </PetsProvider>
                                    </Protected>
                                }
                                />
                                <Route path="/process_payments" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <PaymentPage />
                                    </Protected>
                                }
                                />
                                <Route path="/user-management" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <UserManagement />
                                    </Protected>
                                }
                                />
                                </> :
                                <Route path="/" element={
                                    <DefaultPage />
                                }
                                />
                                }

                                { user.role === "doctor" ?
                                <>
                                    <Route path="/generate_invoice" element={
                                        <Protected isLoggedIn={authenticated}>
                                            <PetsProvider>
                                                <GenerateInvoice />
                                            </PetsProvider>
                                        </Protected>
                                    }
                                    />
                                </>
                                :
                                <Route path="/" element={
                                    <DefaultPage />
                                }
                                />
                                }

                                

                                <Route path="/view_invoices" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <PetsProvider>
                                            <InvoicePage />
                                        </PetsProvider>
                                    </Protected>
                                }
                                />

                                <Route path="/manage_invoice" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <InvoiceForm />
                                    </Protected>
                                }
                                />

                                <Route path="/view_receipt" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <ReceiptForm />
                                    </Protected>
                                }
                                />

                                <Route path="/payment_history" element={
                                    <Protected isLoggedIn={authenticated}>
                                        <PetsProvider>
                                            <PaymentHistory />
                                        </PetsProvider>
                                    </Protected>
                                }
                                />

                                

                                <Route path="/logout" element={<Logout/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/signup" element={<Signup/>}/>
                                <Route path="/confirm" element={<ConfirmSignup/>}/>

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