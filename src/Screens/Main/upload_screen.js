import {Box, Typography, Button } from '@mui/material'
import { styles1, styles2, useStyles } from '../styles/upload_styles';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LinearProgressWithLabel } from '../../components/linear_progress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const Upload = () => {
    const classes = useStyles();
    const handleClick = () => {
        console.log('clicked')
    }

    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
          clearInterval(timer);
        };
      }, []);

    LinearProgressWithLabel.propTypes = {
        value: PropTypes.number.isRequired,
    };


    return (
        <Box className={classes.container1}>
            <Box className={classes.container2}>
                <Box className={classes.container4}>
                    <Typography variant='body2'>
                        <span style={styles1}>Upload file</span>
                    </Typography>
                    <CloseIcon/>
                </Box>
                <Box className={classes.container3}>
                    <DescriptionIcon sx={styles2}/>
                    <Typography variant='body2'>Choose file</Typography>
                </Box>
                <Box className={classes.container5}>
                    <Box className={classes.container10}>
                        <Box className={classes.container7}>
                            <SwitchAccessShortcutAddIcon/>
                        </Box>
                        <Typography variant='body2'>
                            MEE522.pdf
                            <br/>
                            Consuming context...
                        </Typography>
                        <CloseIcon/>
                    </Box>
                    <LinearProgressWithLabel value={progress} />
                </Box>
                <Box className={classes.container12}>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained" endIcon={<ArrowForwardIcon/>}>Next</Button>  
                </Box>
            </Box>

        </Box>
    )
}
export default Upload;