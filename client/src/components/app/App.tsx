import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { withStyles, CssBaseline, WithStyles, Toolbar, Button, Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import { Posts } from '../posts/Posts';
import HomeIcon from '@material-ui/icons/Home';
import { NewPost } from '../posts/NewPostForm';
import { SignUp } from '../sign-up/SignUp';
import { grey } from '@material-ui/core/colors';

const homeLink = (props: any) => <Link {...props} to="/" style={{ textDecoration: "none" }} />;
const newPostLink = (props: any) => <Link {...props} to="/post" style={{ textDecoration: "none" }} />;

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
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

interface AppPropTypes extends WithStyles<typeof styles> { }

const App = ({ classes }: AppPropTypes) => (
  <ApolloProvider client={client}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <div className={classes.layout}>
            <Toolbar className={classes.toolbarMain}>
              <Button component={homeLink} size="small"><HomeIcon /></Button>
              <Button component={newPostLink} size="small"><AddIcon /></Button>
              <Button size="small"><SettingsIcon /></Button>
              <Typography
                component="h1"
                variant="headline"
                color="inherit"
                align="center"
                noWrap
                className={classes.toolbarTitle}
              >
                Downtime
              </Typography>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <SignUp />
            </Toolbar>
            <Toolbar variant="dense" className={classes.toolbarSecondary}>
              <Typography color="inherit">
                Stuff
              </Typography>
              <Typography color="inherit">
                Other Stuff
              </Typography>
              <Typography color="inherit">
                Neat Stuff
              </Typography>
              <Typography color="inherit">
                Buzzy Stuff
              </Typography>
              <Typography color="inherit">
                Snuzzy Fluff
              </Typography>
            </Toolbar>
            <main>
              <Route exact path="/" component={Posts} />
              <Route path="/post" component={NewPost} />
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    </Router>
  </ApolloProvider>
);
export default withStyles(styles(theme))(App);
