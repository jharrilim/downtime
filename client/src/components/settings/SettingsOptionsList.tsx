import React from 'react';
import { WithStyles, Theme, createStyles, withStyles, Divider, Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
  label: {
    paddingTop: '0.6em',
    paddingBottom: '0.2em'
  }
});

interface SettingsOptionsListPropTypes extends WithStyles<typeof styles> {
  labels: string[];
}

const SettingsOptionsList = withStyles(styles)(({ labels, classes }: SettingsOptionsListPropTypes) => {
  return (
    <>
      <nav>
        {labels.map(label => (
          <Grid wrap="wrap" container key={label}>
            <Grid item lg={12}>
              <Link
                to={`/settings/${label.toLowerCase()}`}
                style={{ textDecoration: "none" }}
              >
                <Typography component="h5" variant="h5" className={classes.label}>{label}</Typography>
              </Link>
            </Grid>
            <Grid item lg={10}>
              <Divider />
            </Grid>
          </Grid>
        ))}
      </nav>
    </>
  );
});

export { SettingsOptionsList };