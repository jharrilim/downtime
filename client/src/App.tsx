import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import logo from './logo.svg';
import './App.css';
import { Typography, Button, AppBar, Toolbar, IconButton, createStyles, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const client = new ApolloClient({
  uri: process.env.SERVER_URL || 'http://server:8080'
});

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const App = ({classes}: any) => (
  <ApolloProvider client={client}>
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.grow} variant="h6" color="inherit">
            Downtime
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  </ApolloProvider>
);
export default withStyles(styles)(App);
