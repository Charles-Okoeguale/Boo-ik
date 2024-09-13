import {Box, Typography, Button, Divider, OutlinedInput, FormHelperText, FormControl} from '@mui/material'
import { styles2, styles4, useStyles } from '../styles/signup_styles';
import GoogleIcon from '@mui/icons-material/Google';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithGoogle, signUpWithEmailAndPassword } from '../../utils/handle_form';
import { useNavigate } from 'react-router-dom'; 


const Signup = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
        navigate('/upload')
    };
    
      const handleEmailSignUp = async () => {
        await signUpWithEmailAndPassword(email, password, setEmail, setPassword);
        navigate('/upload')
      };

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
                <Button variant="contained" startIcon={<GoogleIcon/>} onClick={handleGoogleSignIn}>
                    Sign up with Google
                </Button>
                <Divider sx={styles4}>
                    or
                </Divider>
                <FormControl>
                    <OutlinedInput placeholder="Enter your email" id="outlined-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <OutlinedInput
                        placeholder="Enter your password"
                        id="outlined-email"
                        aria-describedby="outlined-email-helper-text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormHelperText id="outlined-email-helper-text">Must be at least 8 characters</FormHelperText>
                    <Box className={classes.container5}>
                        <Button variant="outlined">Cancel</Button>
                        <Button variant="contained" endIcon={<ArrowForwardIcon/>} onClick={handleEmailSignUp}>Sign up</Button>  
                    </Box>
                </FormControl>
            </Box>
        </Box>
    )
}
export default Signup;