import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { useStyles } from './styles/linear_progress';

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