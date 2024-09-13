import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

export function LinearProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.progressContainer}>
        <LinearProgress
          variant="determinate"
          {...props}
          classes={{
            root: classes.progressBar,
            bar: classes.progressBarColor,
          }}
        />
      </Box>
      <Box className={classes.percentageText}>
        <Typography variant="body2">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    background: '#F7F7F7', // Lighter background for better contrast
    borderRadius: '8px',   // Rounded corners
    padding: '0.5em',      // Padding around the container
    width: '100%',
  },
  progressContainer: {
    width: '100%',
    marginRight: '2em',
  },
  progressBar: {
    height: '8px', // Thicker progress bar for better visibility
    borderRadius: '4px', // Rounded corners for the progress bar
    backgroundColor: '#FFFFFF', // Background color for the bar
  },
  progressBarColor: {
    backgroundColor: '#3f51b5', // Color of the progress bar (use your brand color)
  },
  percentageText: {
    minWidth: 50,
    fontWeight: 'bold', // Bold text for readability
    color: '#333', // Darker text for contrast
  },
}));