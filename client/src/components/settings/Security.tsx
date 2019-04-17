import React from 'react';
import { withStyles, Theme, createStyles, Typography } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({});

const Security = withStyles(styles)(() => {

  return (
    <>
      <Typography component="h4" variant="headline">Settings</Typography>
      <Typography component="p" variant="subheading">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie mi urna, id elementum mi bibendum at. Quisque non aliquam lacus. Duis in gravida libero, ut eleifend enim. Donec sit amet est finibus, efficitur turpis id, sollicitudin massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur consequat libero eget purus rutrum volutpat. Sed tempor nibh risus, a blandit nisi scelerisque eu. Aliquam interdum metus sed aliquet malesuada. Nunc a nulla pretium dui laoreet egestas.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at feugiat urna, vel interdum quam. Etiam varius vestibulum convallis. Nunc bibendum nunc in dolor gravida, id pharetra magna facilisis. Phasellus sit amet sollicitudin purus, at imperdiet mauris. Phasellus sed dui odio. Donec volutpat, massa vitae elementum laoreet, leo neque viverra erat, at egestas metus ligula eu turpis. In hac habitasse platea dictumst. Proin dignissim nunc non fermentum lacinia. Morbi eu nisl consequat, viverra risus sed, iaculis sapien. Nunc finibus auctor quam, finibus vehicula libero pharetra vitae. Phasellus condimentum tellus tortor, non euismod leo fringilla at. Vivamus ultricies magna et leo facilisis vestibulum.

        Maecenas dapibus tortor a leo facilisis, luctus fermentum ante mollis. Nam mattis augue a mi facilisis porttitor. In aliquam eu risus non congue. In eu nibh mi. Mauris vulputate arcu eu lacinia ultricies. Mauris in tortor malesuada, sollicitudin sapien eu, facilisis ex. Donec tincidunt interdum tempus. Donec iaculis eleifend nulla non pellentesque. Vestibulum at elit urna. Nullam aliquam ex scelerisque tortor fermentum commodo. Donec eget augue dapibus, scelerisque metus nec, bibendum lorem.

        Nullam vel scelerisque odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ligula ligula. Aenean congue interdum nunc, eu eleifend felis sodales nec. Duis ligula ex, sagittis at dolor nec, auctor posuere enim. Morbi ullamcorper dolor eget ipsum varius ultrices. Mauris gravida est ullamcorper justo blandit, sit amet vehicula velit placerat. Morbi eget velit lacinia, sagittis dolor vitae, hendrerit nunc.

        In nibh magna, bibendum ut lobortis quis, lobortis a dui. Cras sollicitudin iaculis lorem at viverra. Vivamus blandit tellus quis convallis bibendum. Vivamus finibus ante nisl, sed fringilla leo tincidunt vel. Phasellus tortor neque, placerat nec odio non, hendrerit eleifend sem. Vestibulum malesuada ligula ornare venenatis aliquam. Ut pharetra ornare ante vel interdum. Ut ac turpis dolor. Phasellus rhoncus sem ac arcu rhoncus, et rhoncus lorem mattis. Praesent rhoncus est nec mollis suscipit. Maecenas vulputate odio orci, ac dapibus sapien eleifend et. Mauris eget tincidunt arcu.
      </Typography>
    </>
  );
});

export { Security };
