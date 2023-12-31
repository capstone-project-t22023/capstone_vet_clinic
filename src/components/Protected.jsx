//React imports
import { Navigate } from "react-router-dom";

/**
 * 
 * Component of the website that filters unauthenticated users
 * Called in the App.jsx file
 * 
 */

//Prevents unauthenticated users from accessing pages, redirected to login page
const Protected = ({ isLoggedIn, children }) => {
     if ((!isLoggedIn) && (!localStorage.getItem('token'))) {
            return <Navigate to="/home" replace />;
     }
    return children;
};
export default Protected;