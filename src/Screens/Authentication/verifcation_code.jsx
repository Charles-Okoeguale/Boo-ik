import {Box, Typography, TextField, FormHelperText, Button} from '@mui/material'
import { useStyles } from '../../Screens/styles/verification_styles';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const CodeInput = styled(TextField)(({ theme }) => ({
    textAlign: 'center',
    '& .MuiOutlinedInput-root': {
        height: '4em',
        width: '4em',
        fontSize: '1.5em',
        margin: '0 8px',
        borderRadius: '0.5em'
     },
     '& .MuiInputBase-input': {
        fontSize: '2em',
        fontWeight: 700,
        textAlign: 'center', 
        height: '100%', 
     },
}));

const Verification = () => {
    const classes = useStyles();

    const [values, setValues] = useState(['', '', '', '']);

    const handleChange = (e, index) => {
      const newValues = [...values];
      newValues[index] = e.target.value;
      setValues(newValues);
      if (e.target.value.length === 1 && index < 3) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
      if (e.target.value.length === 0 && index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus();
      }
    };

    const handleClick = () => {
        console.log('clicked')
    }
    return (
        <Box className={classes.container1}>
            <Box className={classes.container2}>
                <Box className={classes.container4}>
                    <Box className={classes.container3}>
                        <MailOutlineIcon/>
                    </Box>
                    <Typography variant='body2'>
                        <span style={{fontSize: '1.5em', fontWeight: 700}}>Check your email</span>
                        <br /> We sent a verification code to <span style={{fontWeight: 'bold'}}>
                        egualecharles@gmail.com</span>
                    </Typography>
                </Box>
                <Box className={classes.container6}>
                    {values.map((value, index) => (
                        <CodeInput
                            key={index}
                            id={`code-input-${index}`}
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                            inputProps={{ maxLength: 1 }}
                        />
                    ))}
                </Box>
                <FormHelperText id="outlined-email-helper-text" onClick={handleClick}>
                    Didn't get a code? <span style={{fontWeight: 'bold', color: 'black'}}>
                    Click to resend</span>
                </FormHelperText>
                <Box className={classes.container5}>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained">Verify</Button>  
                </Box>
            </Box>
        </Box>
    )
}
export default Verification;