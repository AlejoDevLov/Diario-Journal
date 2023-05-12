import { LogoutOutlined } from "@mui/icons-material";
import MenuOutlined from "@mui/icons-material/MenuOutlined"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";

import '../../css/sidebar.css';



export const NavBar = ({ drawerWidth, elementRef }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch( startLogout() )
    }

    const toggleSidebar = () => {
        const sidebar = elementRef.current;
        // console.log(sidebar);
        sidebar.classList.toggle('sidebar');
    }

  return (
    <AppBar
        className="button-navbar"
        position="fixed"
        sx={{
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
        }}
    >
        <Toolbar>
            <IconButton
                className="button-navbar"
                color="inherit"
                edge="start"
                sx={{ mr: 2, display: {sm: 'none'} }}
                onClick={ toggleSidebar }
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Typography variant="h6" noWrap component="div" >Journal App</Typography>

                <IconButton
                    color="error" 
                    onClick={ onLogout }>
                    <LogoutOutlined />
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}

NavBar.proptypes ={
    drawerWidth: PropTypes.string.isRequired,
}

NavBar.defaultProps = {
    drawerWidth: 240,
}