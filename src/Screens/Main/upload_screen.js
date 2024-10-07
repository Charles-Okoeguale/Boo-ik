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
import { toast } from 'react-toastify'; 
import { handleAnalyzePdf } from '../../utils/handle_others';

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

  const handleClick = async () => {
    try {
      setLoading(true);
      const { pdfUrl, pdfName } = await handleAnalyzePdf(selectedFile, setProgress);
      localStorage.setItem('pdfUrl', pdfUrl);
      localStorage.setItem('pdfName', pdfName);
      setAnalysed(true)
      toast.success('PDF processed successfully!');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  

  const handleNext = () => {
    const pdfName = localStorage.getItem('pdfName');
    navigate(`/pdf_viewer/${encodeURIComponent(pdfName)}`);
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
            onClick={analysed ? handleNext : handleClick}
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