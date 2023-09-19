import React, {useEffect} from 'react';

export default function Logout() {

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('authenticated');
        window.location.replace("http://localhost:3000/pawsome_public/index.html");
    }, []);
    return (
        <div></div>
    )
}
