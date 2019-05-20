import React, { useState } from 'react';
import { withStyles, Theme, createStyles, Typography, Card, CardHeader, Avatar, WithStyles, CardMedia, CardContent, Tabs, Tab } from '@material-ui/core';
import useLocalStorage from '@rehooks/local-storage';
import { User } from '../../../data/models/User.model';
import { grey } from '@material-ui/core/colors';
import SwipeableViews from 'react-swipeable-views';

const styles = (theme: Theme) => createStyles({
  avatar: {
    backgroundColor: grey[500]
  }
});

interface ProfilePropTypes extends WithStyles<typeof styles> { }

const Profile = withStyles(styles)(({ classes }: ProfilePropTypes) => {
  const [userString] = useLocalStorage('user');
  const [tabValue, mutTabValue] = useState(0);
  const user = userString ? JSON.parse(userString as string) as User : null;
  if (!user) {
    return (
      <>
        <Typography component="h4">Please login first.</Typography>
      </>
    );
  }
  return (
    <>
      <Card>
        <CardHeader avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {user.username[0].toUpperCase()}
            </Avatar>
          }
          title={user.username}
          subheader={user.email !== user.username ? user.email : undefined}
        />
        <CardContent>
          <Tabs value={tabValue} onChange={(e, v: number) => mutTabValue(v)}>
            <Tab label="Posts" />
            <Tab label="Comments" />
          </Tabs>
          <SwipeableViews index={tabValue} onChangeIndex={i => mutTabValue(i)}>
            <p>hihihih</p>
            <p>hohohohoh</p>
          </SwipeableViews>
        </CardContent>
      </Card>
    </>
  );
});

export { Profile };
