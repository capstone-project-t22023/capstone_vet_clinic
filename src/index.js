//React import
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

//Local file imports
import App from './App.jsx';

//Custom CSS files
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

/**
 * 
 * Entry point to the web application
 * 
 */

//expire user information after some time
const cleanSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('authenticated');
  window.location.replace("http://localhost:3000/pawsome_public/index.html");
}

//window.setTimeout(cleanSession, 1000*30);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
