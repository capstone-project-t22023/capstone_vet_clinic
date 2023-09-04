import React, { useEffect } from 'react';

export default function StaticLanding() {

    useEffect(() => {
        window.location.replace("http://localhost:3000/pawsome_public/index.html");
    }, []);
    return (
        <div></div>
    )

}
