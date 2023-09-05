import React, {useEffect} from 'react';

export default function Logout() {

    useEffect(() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('authenticated');
        window.location.replace("http://localhost:3000/pawsome_public/index.html");
    }, []);
    return (
        <div></div>
    )
}
