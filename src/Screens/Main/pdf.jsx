import { Box, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from '../styles/pdf_viewer_styles';
import ChatInterface from '../../components/chat_interface';

const PDFViewer = () => {
  const classes = useStyles()
  return (
    <Box className={classes.container1}>
      <Typography>
        Cover.pdf
      </Typography>
      <Box className={classes.container2}>
        <Box className={classes.viewer}>
       
        </Box>
        <ChatInterface />
      </Box>
    </Box>
  );
};
export default PDFViewer;