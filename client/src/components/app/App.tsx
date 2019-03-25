import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import './App.css';
import { withStyles, Drawer, CssBaseline, WithStyles } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavItems } from '../nav-items/NavItems';
import { Posts } from '../posts/Posts';
import { Header } from '../header/Header';
import { NewPost } from '../posts/NewPostForm';
import { SignUp } from '../sign-up/SignUp';
import { grey } from '@material-ui/core/colors';

const drawerWidth = 240;

const client = new ApolloClient({
  uri: process.env.NOW_URL ? process.env.NOW_URL + '/api' :
    process.env.SERVER_URL || `http://${location.hostname}:8080`
});


const theme = createMuiTheme({
  palette: {
    primary: grey
  }
});

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
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

interface AppPropTypes extends WithStyles<typeof styles> { }

const App = ({ classes }: AppPropTypes) => (
  <ApolloProvider client={client}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <div className={classes.root}>
            <Header />
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}>

              <div className={classes.toolbar} />
              <NavItems />
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Route exact path="/" component={Posts} />
              <Route path="/post" component={NewPost} />
              <Route path="/signup" component={SignUp} />
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    </Router>
  </ApolloProvider>
);
export default withStyles(styles(theme))(App);
