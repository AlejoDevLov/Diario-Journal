import { useSelector } from "react-redux"
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { SideBarItem } from "./SideBarItem";

import '../../css/sidebar.css';



export const SideBar = ({ drawerWidth, elementRef }) => {

    const { displayName } = useSelector( state => state.auth );

    const { notes } = useSelector( state => state.journal );

  

  return (
    <Box
        ref={ elementRef }
        className="sidebar sidebar-2"
        component="nav"
        sx={{ width: { xs: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant="permanent"
            open
            sx={{ 
                display: { xs: 'block' }, 
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div" >
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider />

            <List
                // className="sidebar hide-sidebar"
                >
                {
                    notes.map( note => (
                        <SideBarItem note={note} key={note.id}/>
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
