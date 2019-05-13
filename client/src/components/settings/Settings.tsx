import React from 'react';
import { Typography, withStyles, Theme, createStyles, Grid, Divider, WithStyles } from '@material-ui/core';
import { SettingsOptionsList } from './SettingsOptionsList';
import { Route } from 'react-router';
import { Profile } from './profile/Profile';
import { Security } from './Security';

const styles = (theme: Theme) => createStyles({
  title: {
    paddingBottom: '0.5em'
  }
});

const mockSettings = [
  'Profile',
  'Security',
  'Feedback',
  'Others'
];

interface SettingsPropTypes extends WithStyles<typeof styles> { }

export const Settings = withStyles(styles)(({ classes }: SettingsPropTypes) => {
  return (
    <Grid 
      wrap="wrap"
      container
    >
      <Grid item md={2}>
        <Grid item>
          <Typography 
            component="h5"
            variant="h5"
            color="inherit"
            align="left"
            className={classes.title}
          >
            Settings
          </Typography>
        </Grid>
        <Grid item lg={12}><SettingsOptionsList labels={mockSettings} /></Grid>
      </Grid>
      <Grid item md={10}>
        <Route path="/settings/profile" component={Profile} />
        <Route path="/settings/security" component={Security} />
      </Grid>
    </Grid>
  );
});