import { Box, Toolbar } from "@mui/material"
import { NavBar, SideBar } from "../components";
import { useRef } from "react";


// let drawerWidth = (window.screen.width * 10) / 100;
const drawerWidth = 240;

export const JournalLayout = ({ children }) => {

  // console.log( window.screen.width );
  // console.log( window.screen.availWidth );

  // const [width, setWidth] = useState(drawerWidth);

  // useEffect(() => {
  //   if ( window.screen.width < 550 ){
  //     setWidth( 100 );
  //   }
  
  // }, [window.screen.width]);
  
  const refDom = useRef('');
  
  return (
    <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster"  
    >

        <NavBar drawerWidth={ drawerWidth }elementRef={refDom} />

        <SideBar drawerWidth={ drawerWidth } elementRef={ refDom }/>

        <Box
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />
            { children }
        </Box>
    </Box>
  )
}
