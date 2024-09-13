import {Box, Typography, Button, Divider, OutlinedInput, FormHelperText, FormControl} from '@mui/material'
import { styles2, useStyles } from '../../Screens/styles/signup_styles';
import GoogleIcon from '@mui/icons-material/Google';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const Signup = () => {
    const classes = useStyles();
    return (
        <Box className={classes.container1}>
            <Box className={classes.container2}>
                <Box className={classes.container4}>
                    <Box className={classes.container3}>
                        <SwitchAccessShortcutAddIcon/>
                    </Box>
                    <Typography variant='body2'>
                    <span style={styles2}>Create an account</span>
                        <br /> Already have an account? 
                        <span style={{fontWeight: 'bold', textDecoration: 'none'}}>
                        <Link to="/auth/login">{' '}Login</Link>
                    </span>
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<GoogleIcon/>}>
                    Sign up with Google
                </Button>
                <Divider
                sx={{
                    fontFamily: 'Space Grotesk',
                    fontWeight: 700,
                    color: 'black',
                    marginBottom: '2em',
                }}
                >
                    or
                </Divider>
                <FormControl>
                    <OutlinedInput placeholder="Enter your email" id="outlined-email" />
                    <OutlinedInput
                        placeholder="Enter your password"
                        id="outlined-email"
                        aria-describedby="outlined-email-helper-text"
                    />
                    <FormHelperText id="outlined-email-helper-text">Must be at least 8 characters</FormHelperText>
                    <Box className={classes.container5}>
                        <Button variant="outlined">Cancel</Button>
                        <Button variant="contained" endIcon={<ArrowForwardIcon/>}>Sign up</Button>  
                    </Box>
                </FormControl>
            </Box>
        </Box>
    )
}
export default Signup;