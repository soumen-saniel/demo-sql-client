import React from 'react';

// Styles
import classes from './styles';

const Home = () => {
  return (
    <section css={classes.root}>
      <h1>Please select an existing query.
        <br />Or create a new one by clicking + button in Tab bar.</h1>
    </section>
  );
};

export default Home;
