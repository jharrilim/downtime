import React from 'react';
import { createStyles, withStyles, Theme, WithStyles, Toolbar } from '@material-ui/core';

import { Category } from './Category';

const styles = (theme: Theme) => createStyles({
  toolbarSecondary: {
    justifyContent: 'space-between'
  }
});

interface CategoriesPropTypes extends WithStyles<typeof styles> {
  categories: string[]
}

const Categories = withStyles(styles)(({ classes, categories }: CategoriesPropTypes) => {
  return (
    <Toolbar className={classes.toolbarSecondary} variant="dense">
      {categories.map(category => <Category key={category} name={category} />)}
    </Toolbar>
  );
});

export { Categories };
