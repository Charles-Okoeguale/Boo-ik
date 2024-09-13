import { Box, Button, Typography } from "@mui/material"
import { useStyles } from "./styles/navbar_styles";
import Avatar from '@mui/material/Avatar';
import flick from '../images/flickr_527573.png'; 

const Navbar = ({email, logout}) => {
    const classes = useStyles()
    return (
        <Box className={classes.container1}>
            <Box className={classes.container2}>
                <Avatar alt="" src="/static/images/avatar/1.jpg" />
                <Typography>{email}</Typography>
            </Box>
            <Button variant="contained" onClick={logout}>Logout</Button> 
        </Box>
    )
}

export default Navbar;