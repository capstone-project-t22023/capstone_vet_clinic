import React, {useContext} from 'react'
import {Stack, Typography} from "@mui/material";
import ProgramContext from "../ProgramContext";

export default function Footer() {
    const {user, authenticated} = useContext(ProgramContext);
    return (
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}
               sx={{py: 4, backgroundColor: "secondary.100"}}>

            <Typography component="h3" variant="h5">Footer Section</Typography>

            {authenticated && (
                <Typography component="h2" variant="h6" color="primary.main">
                    {user.role === "doctor" ? "Doctor's page" :
                        user.role === "admin" ? "Admin's page" :
                            user.role === "pet_owner" ? "Customer's page" : null}
                </Typography>
            )}

            <Typography component="p"
                        variant="p">{authenticated ? "Hi " + user.firstname + "!" : "Please Log In"}</Typography>
        </Stack>

    )
}
