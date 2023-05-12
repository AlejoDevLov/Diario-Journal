import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";



export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#034159'
        },
        secondary: {
            main: '#543884'
        },
        third: {
            main: '#262254',
        },
        error: {
            main: red.A400
        }
    }
})