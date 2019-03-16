import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
const NavItems = () => (
  <>
    <List>
        <ListItem button key='Home'>
          <ListItemIcon><HomeIcon/></ListItemIcon>
          <ListItemText primary='Home' />
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