import React, {useContext} from 'react'
import {Stack, Typography} from "@mui/material";
import ProgramContext from "../ProgramContext";

export default function Footer() {
    const {user, authenticated} = useContext(ProgramContext);
  return (
    <div>

        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={5} sx={{py: 4, backgroundColor: "white"}}>
          <Typography component="h3" variant="h5">Footer Section</Typography>
            <div className={"m-5"}>
                <Typography component="p" variant="p">{authenticated? "Hi " + user.firstname + "!" : "Please Log In" }</Typography>
            </div>
        </Stack>

    </div>
  )
}
