import {Box, Typography, Button, Divider, OutlinedInput, FormHelperText, FormControl } from '@mui/material'
import { styles2, styles3, useStyles } from '../styles/signup_styles';
import GoogleIcon from '@mui/icons-material/Google';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { handleAuthSuccess } from '../../utils/handle_others';
import { sendResetEmail, signInWithGoogle } from '../../utils/handle_form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (!email) {
            console.error("Please enter an email address.");
            return;
        }
        await sendResetEmail(email);
    }

    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
        navigate('/upload')
    };
    
      const handleEmailSignUp = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            if (user) {
                await handleAuthSuccess(user);
                navigate('/upload')
            } else;
        } catch (error) {
            console.log(error)
        }
      };


    return (
        <Box className={classes.container1}>
            <Box className={classes.container2}>
                <Box className={classes.container4}>
                    <Box className={classes.container3}>
                        <SwitchAccessShortcutAddIcon/>
                    </Box>
                    <Typography variant='body2'>
                        <span style={styles2}>Welcome Back</span>
                        <br /> Don't have an account? 
                        <span style={{fontWeight: 'bold', textDecoration: 'none'}}>
                        <Link to="/auth/signup">{' '}Signup</Link>
                        </span>
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<GoogleIcon/>} onClick={handleGoogleSignIn}>
                    Continue with Google
                </Button>
                <Divider sx={styles3}>
                    or
                </Divider>
                <FormControl>
                    <OutlinedInput 
                        placeholder="Enter your email" 
                        id="outlined-email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <OutlinedInput
                        placeholder="Enter your password"
                        id="outlined-email"
                        aria-describedby="outlined-email-helper-text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormHelperText id="outlined-email-helper-text" onClick={handleClick}>Forgot password?</FormHelperText>
                    <Box className={classes.container5}>
                        <Button variant="outlined">Cancel</Button>
                        <Button variant="contained" endIcon={<ArrowForwardIcon/>} onClick={handleEmailSignUp}>Sign up</Button>  
                    </Box>
                </FormControl>
            </Box>
        </Box>
    )
}
export default Login;