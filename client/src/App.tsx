import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import './App.css';
import { Typography, AppBar, Toolbar, withStyles, Drawer, CssBaseline } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { NavItems } from './NavItems';
import { Posts } from './Posts';

const drawerWidth = 240;

const client = new ApolloClient({
  uri: process.env.SERVER_URL || 'http://localhost:8080'
});

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

const App = ({ classes }: any) => (
  <ApolloProvider client={client}>
    <div className="App">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Downtime
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <NavItems />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Posts />
        </main>
      </div>
    </div>
  </ApolloProvider>
);
export default withStyles(styles)(App);
