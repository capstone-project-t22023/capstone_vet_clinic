import React, {useContext} from 'react'
import {Container, Typography} from "@mui/material";
import ProgramContext from "../ProgramContext";

export default function Footer() {
    const {user, authenticated} = useContext(ProgramContext);
  return (
    <div>

      <Container maxWidth="lg">
          <Typography component="h3" variant="h5">Footer Section</Typography>
            <div className={"m-5"}>
                <Typography component="p" variant="p">{authenticated? "Hi " + user.firstname + "!" : "Please Log In" }</Typography>
            </div>
      </Container>

    </div>
  )
}
