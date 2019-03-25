import React from 'react';
import { AppBar, Toolbar, Typography, WithStyles, withStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'secondary'
    }
});

interface HeaderPropTypes extends WithStyles<typeof styles> {
    
}

export const header = ({ classes }: HeaderPropTypes) => (
    <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        Downtime
      </Typography>
    </Toolbar>
  </AppBar>
);

export const Header = withStyles(styles)(header);
