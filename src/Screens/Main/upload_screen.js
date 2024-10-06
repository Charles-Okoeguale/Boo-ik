import { Box, Typography, Button } from '@mui/material';
import { styles1, styles2, useStyles } from '../styles/upload_styles';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { LinearProgressWithLabel } from '../../components/linear_progress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UseAuth from '../../hook/useAuth';
import Navbar from '../../components/navbar';
import { handleFileChange, handleIconClick, logout } from '../../utils/handle_form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { getAuth } from "firebase/auth"

const Upload = () => {
  const currentUser = UseAuth();
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysed, setAnalysed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const handleAnalyzePdf = async () => {
    if (!selectedFile) {
      toast.warn('Please upload a PDF file.');
      return;
    }
  
    setLoading(true);
    setProgress(0);
  
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'vpwyqduo');
  
    try {
      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dcm42p2eg/upload',
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );
  
      const pdfUrl = uploadResponse.data.secure_url;

      const user = getAuth().currentUser;
      if (!user) {
        throw new Error('User is not authenticated');
      }
  
      const idToken = await user.getIdToken();

      await axios.post('http://localhost:5000/api/process-pdf', {
        pdfUrl,
        idToken,
      });

      setAnalysed(true);
      localStorage.setItem('pdfUrl', pdfUrl);
      setProgress(100);
      toast.success('PDF processed successfully!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response:', error.response);
          toast.error(`Error: ${error.response.data.message || 'Failed to process PDF'}`);
        } else if (error.request) {
          console.error('Error request:', error.request);
          toast.error('Server Error . Please try again later.');
        }
      } else {
        console.error('Error message:', error.message);
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleNext = () => {
    navigate('/pdf_viewer')
  };

  const cancel = () => {
    setAnalysed(false);
    setLoading(false);
    setSelectedFile(null);
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
          ) : <Typography variant='body2'>Choose file</Typography>}
        </Box>
        <Box className={classes.container5}>
          <Box className={classes.container10}>
            <Box className={classes.container7}>
              <SwitchAccessShortcutAddIcon/>
            </Box>
            <Typography variant='body2'>
              {loading ? 'Analyzing document...' : 'Boo-ik is ready to analyze your document'}
            </Typography>
            {!loading ? <CloseIcon onClick={cancel}/> : null}
          </Box>
          {loading && <LinearProgressWithLabel value={progress} />}
        </Box>
        <Box className={classes.container12}>
          <Button variant="outlined" onClick={cancel}>Cancel</Button>
          <Button
            disabled={loading}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={analysed ? handleNext : handleAnalyzePdf}
            sx={{
              backgroundColor: loading ? 'lightgrey' : 'black',
              color: loading ? 'grey' : 'white',
            }}
          >
            {analysed ? 'Open document' : 'Analyze'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default Upload;