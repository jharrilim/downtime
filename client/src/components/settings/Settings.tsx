import React from 'react';
import { Typography, withStyles, Theme, createStyles, Grid } from '@material-ui/core';
import { SettingsOptionsList } from './SettingsOptionsList';

const styles = (theme: Theme) => createStyles({
  title: {

  }
});

const mockSettings = [
  'Profile',
  'Security',
  'Feedback',
  'Others',

]

export const Settings = withStyles(styles)(() => {
  return (
    <Grid 
      wrap="wrap"
      container
    >
      <Grid item md={4}>
        <Grid item>
          <Typography 
            component="h5"
            variant="h5"
            color="inherit"
            align="left"
          >      
            Settings
          </Typography>
        </Grid>
        <Grid item lg={6}><SettingsOptionsList labels={mockSettings} /></Grid>
      </Grid>
    </Grid>
  );
});