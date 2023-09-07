import React from 'react';
import {Container, Stack} from '@mui/material';
import LoginForm from '../components/authorization/LoginForm'

export default function Login() {

    console.log("How many times reload");


    return (
        <div>
            {/*<Header/>*/}
            <Container maxWidth="md" sx={{mt: 5, mb: 5, pt:3, pb:10, border: "5px solid #f5effb", borderColor: "grey.100"}}>
                    <LoginForm/>
            <Stack direction="column" spacing={2} sx={{my: 3, mx: "auto"}}>
                <p>Pet owner: abundantasparagus -> abundantasparagus_2023</p>
                <p>Doctor: teemingbroth -> teemingbroth_2023</p>
                <p>admin: pawsome_admin -> pawsome_admin2023</p>
            </Stack>
            </Container>

            {/*<Footer/>*/}
        </div>
    )
}