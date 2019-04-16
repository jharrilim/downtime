import React from 'react';
import { Typography, withStyles, Theme, createStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  title: {

  }
});

export const Settings = withStyles(styles)(() => {
  return (
    <>
      <Typography 
        component="h5"
        variant="h5"
        color="inherit"
        align="left"
      >
        Settings
      </Typography>
    </>
  );
});