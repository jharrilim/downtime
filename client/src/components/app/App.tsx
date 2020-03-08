import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { withStyles, CssBaseline, WithStyles, Toolbar, Button, Typography, Tooltip } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import { Posts } from '../posts/Posts';
import HomeIcon from '@material-ui/icons/Home';
import { NewPost } from '../posts/NewPostForm';
import SignUp from '../sign-up/SignUp';
import { useLocalStorage } from '@rehooks/local-storage';
import { User } from '../../data/models/User.model';
import { SignIn } from '../sign-in/SignIn';
import { Settings } from '../settings/Settings';
import { Categories } from './Categories';
import { appStyles, appTheme } from './App.styles';

const homeLink = (props: any) => <Link {...props} to="/" style={{ textDecoration: "none" }} />;
const newPostLink = (props: any) => <Link {...props} to="/post" style={{ textDecoration: "none" }} />;
const settingsLink = (props: any) => <Link {...props} to="/settings" style={{ textDecoration: "none" }} />;

const serverUrl = process.env.NODE_ENV !== 'production'
  ? `http://${window.location.hostname}:8080`
  : process.env.SERVER_URL || `http://${window.location.hostname}:${window.location.port}/api`;

const client = new ApolloClient({
  uri: serverUrl
});

const mockCategories = ['foo', 'bar', 'baz', 'qux', 'qwop'];

interface AppPropTypes extends WithStyles<typeof appStyles> { }

const App = withStyles(appStyles)(({ classes }: AppPropTypes) => {
  const [userString] = useLocalStorage('user');
  const user = userString ? JSON.parse(userString as string) as User : null;
  return (
    <ApolloProvider client={client}>
      <Router>
        <MuiThemeProvider theme={appTheme}>
          <CssBaseline />
          <div className="App">
            <div className={classes.layout}>
              <Toolbar className={classes.toolbarMain}>
                <Tooltip title="Home">
                  <Button component={homeLink} size="small"><HomeIcon /></Button>
                </Tooltip>
                <Tooltip title="Post">
                  <Button component={newPostLink} size="small" ><AddIcon /></Button>
                </Tooltip>
                <Tooltip title="Settings">
                  <Button component={settingsLink} size="small"><SettingsIcon /></Button> 
                </Tooltip>
                <Typography
                  component="h1"
                  variant="h5"
                  color="inherit"
                  align="center"
                  noWrap
                  className={classes.toolbarTitle}
                >
                  Downtime
                </Typography>
                {user &&
                  <Typography variant="subtitle2">{user.username}</Typography>
                }
                <IconButton>
                  <SearchIcon />
                </IconButton>
                <SignUp />
              { !user && <SignIn /> }
              </Toolbar>
              <Categories categories={mockCategories} />
              <main>
                <Route exact path="/" component={Posts} />
                <Route path="/post" component={NewPost} />
                <Route path="/settings" component={Settings} />
              </main>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    </ApolloProvider>
  )
});

export default App;
