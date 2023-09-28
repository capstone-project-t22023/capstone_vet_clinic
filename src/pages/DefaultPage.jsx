import React, { useEffect } from 'react';

export default function StaticLanding() {

    useEffect(() => {
        window.location.replace("http://localhost:3000/404/Patch/index.html");
    }, []);
    return (
        <div></div>
    )

}
