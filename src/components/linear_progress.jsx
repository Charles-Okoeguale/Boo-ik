import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { useStyles } from './styles/linear_progress';

export function LinearProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.progressContainer}>
        <LinearProgress
          variant="indeterminate"
          {...props}
          classes={{
            root: classes.progressBar,
            bar: classes.progressBarColor,
          }}
        />
      </Box>
    </Box>
  );
}