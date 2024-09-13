import {Box, Typography, Button } from '@mui/material'
import { styles1, styles2, useStyles } from '../styles/upload_styles';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LinearProgressWithLabel } from '../../components/linear_progress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UseAuth from '../../hook/useAuth';
import Navbar from '../../components/navbar';
import { handleFileChange, handleIconClick, logout} from '../../utils/handle_form';

const Upload = () => {
    const currentUser = UseAuth()
    const classes = useStyles();
    const [progress, setProgress] = useState(10);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

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
            <Navbar email={currentUser?.currentUser?.email} logout={logout}/>
            <Box className={classes.container2}>
                <Box className={classes.container4}>
                    <Typography variant='body2'>
                        <span style={styles1}>Upload file</span>
                    </Typography>
                    <CloseIcon/>
                </Box>
                <Box className={classes.container3}>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        accept=".pdf"
                        onChange={(event) => handleFileChange(event, setSelectedFile, setFileUrl)}
                    />
                    <DescriptionIcon sx={styles2} onClick={handleIconClick} />
                    <Typography variant='body2'>Choose file</Typography>
                    {selectedFile && (
                        <Typography variant='body2'>{selectedFile.name}</Typography>
                    )}
                    {/* {fileUrl && (
                        <Box mt={2}>
                            <iframe
                                src={fileUrl}
                                style={{ width: '100%', height: '500px' }}
                                title="PDF Preview"
                            >

                            </iframe>
                        </Box>
                    )} */}
                </Box>
                <Box className={classes.container5}>
                    <Box className={classes.container10}>
                        <Box className={classes.container7}>
                            <SwitchAccessShortcutAddIcon/>
                        </Box>
                        <Typography variant='body2'>
                            MEE522.pdf
                            <br/>
                            uploading document...
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