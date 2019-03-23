import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link as RouterLink } from 'react-router-dom';

const homeLink = (props: any) => <RouterLink { ...props } to="/" />;
const newPostLink = (props: any) => <RouterLink { ...props } to="/post" />;
const signupLink = (props: any) => <RouterLink { ...props } to="/signup" />;

const NavItems = () => (
  <>
    <List>
        <ListItem component={homeLink} button key='Home'>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary='Home' />          
        </ListItem>

        <ListItem component={newPostLink} button key='NewForm'>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary='Post' />
        </ListItem>

        <ListItem component={signupLink} button key='SignUp'>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary='Sign Up' />
        </ListItem>
    </List>
    <Divider />
    <List>
        <ListItem button key='Settings'>
          <ListItemIcon><SettingsIcon/></ListItemIcon>
          <ListItemText primary='Settings' />
        </ListItem>
    </List>
  </>
);

export { NavItems };
