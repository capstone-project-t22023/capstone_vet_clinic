import React, {useContext} from 'react'
import {Stack, Typography} from "@mui/material";
import ProgramContext from "../contexts/ProgramContext";

export default function Footer() {
    return (
        <Stack direction="column" alignItems="center" spacing={2} sx={{py: 1, mt:3}}>

            <Stack direction="row" flex={1} spacing={2} justifyContent="space-between">
                <Typography component="h4" color="grey.500">Copyrights © 2023</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Typography color="primary.100"><strong>Kayneth Marie Calica</strong> - K221516</Typography>
                <Typography color="primary.100"><strong>Laurence Mello</strong> - K210366</Typography>
                <Typography color="primary.100"><strong>Malgorzata Mika</strong> - K220251</Typography>
                <Typography color="primary.100"><strong>Julius Urblik</strong> - K210696</Typography>

            </Stack>

        </Stack>

    )
}
