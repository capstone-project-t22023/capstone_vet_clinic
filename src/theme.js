// import { createContext, useState, useMemo } from "react";
import { createTheme } from '@mui/material/styles';
import { indigo, teal, grey } from '@mui/material/colors';

const theme = createTheme({
    // palette: {
    //     primary: {
    //         light: '#757ce8',
    //         main: '#3f50b5',
    //         dark: '#002884',
    //         contrastText: '#fff',
    //     },
    //     secondary: {
    //         light: '#ff7961',
    //         main: '#f44336',
    //         dark: '#ba000d',
    //         contrastText: '#fff',
    //     },
    // },
    palette: {
        mode: 'light',
        primary: indigo,
        secondary: teal,
        grey: grey,
        background: {
            default: '#f2f4f8',
        },
    },
});

export default theme
