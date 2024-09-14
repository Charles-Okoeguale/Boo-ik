import {Box, Typography, Button } from '@mui/material'
import { styles1, styles2, useStyles } from '../styles/upload_styles';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LinearProgressWithLabel } from '../../components/linear_progress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UseAuth from '../../hook/useAuth';
import Navbar from '../../components/navbar';
import { handleFileChange, handleIconClick, logout} from '../../utils/handle_form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { getAuth } from "firebase/auth"

const Upload = () => {
    const currentUser = UseAuth()
    const classes = useStyles();
    const [progress, setProgress] = useState(10);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth()

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
    }

    const handleAnalyzePdf = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'vpwyqduo');
    
        try {
            const uploadResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/dcm42p2eg/upload',
                formData
            );
            const pdfUrl = uploadResponse.data.secure_url;
            const user = getAuth()
            const idToken = user.currentUser.accessToken

            // send url to firestore, stream url to extract text from pdf, extract text from pdf, send back to client - use response as prompt and store contexts using prev question to answer now.
            
            const processResponse = await axios.post('http://localhost:5000/api/process-pdf', {
                pdfUrl: pdfUrl,
                idToken: idToken
            });
            // toast.success('PDF processed successfully!');
            // navigate('/pdf_viewer', { state: { fileUrl: pdfUrl } });
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                toast.error(`Error: ${error.response.data.message || 'Failed to upload or process PDF'}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                toast.error('Error: No response from the server.');
            } else {
                console.error('Error message:', error.message);
                toast.error(`Error: ${error.message}`);
            }
        }
    };


    return (
        <Box className={classes.container1}>
            <Navbar email={currentUser?.currentUser?.email} logout={logout}/>
            <Box className={classes.container2}>
                <Box className={classes.container4}>
                    <Typography variant='body2'>
                        <span style={styles1}>Upload file</span>
                    </Typography>
                </Box>
                <Box className={classes.container3}>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        accept=".pdf"
                        onChange={(event) => handleFileChange(event, setSelectedFile)}
                    />
                    <DescriptionIcon sx={styles2} onClick={handleIconClick} />
                    {selectedFile ? (
                        <Typography variant='body2'>{selectedFile.name}</Typography>
                    ): <Typography variant='body2'>Choose file</Typography>}
                </Box>
                <Box className={classes.container5}>
                    <Box className={classes.container10}>
                        <Box className={classes.container7}>
                            <SwitchAccessShortcutAddIcon/>
                        </Box>
                        {selectedFile ? 
                        <Typography variant='body2'>
                            analyzing document...
                        </Typography> : <Typography variant='body2'>
                            Boo-ik is ready to analyze your document
                        </Typography>}
                        <CloseIcon/>
                    </Box>
                    <LinearProgressWithLabel value={progress} />
                </Box>
                <Box className={classes.container12}>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained" endIcon={<ArrowForwardIcon/>} onClick={handleAnalyzePdf}>Analyze</Button>  
                </Box>
            </Box>
        </Box>
    )
}
export default Upload;