import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStyles } from '../styles/pdf_viewer_styles';
import ChatInterface from '../../components/chat_interface';
import MyPdfViewer from '../../components/pdfViewer';
import { useParams } from 'react-router-dom';

const PDFViewer = () => {
  const classes = useStyles()
  const [pdf, setPdf] = useState()
  const { pdfName } = useParams();

  useEffect(() => {
    const url = localStorage.getItem('pdfUrl')
    setPdf(url)
  }, [])

  return (
    <Box className={classes.container1}>
      <Typography>
        {pdfName}
      </Typography>
      <Box className={classes.container2}>
        <Box className={classes.viewer}>
          <MyPdfViewer pdfUrl={pdf}/>
        </Box>
        <ChatInterface />
      </Box>
    </Box>
  );
};
export default PDFViewer;

