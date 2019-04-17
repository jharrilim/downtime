import React from 'react';
import { Typography } from '@material-ui/core';

interface CategoryPropTypes {
  name: string;
}

const Category = ({ name }: CategoryPropTypes) => {

  return (
    <>
      <Typography color="inherit">{name}</Typography>
    </>
  )
}

export { Category };
