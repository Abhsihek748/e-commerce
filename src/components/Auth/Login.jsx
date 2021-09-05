import React, { useState, useContext, useEffect } from 'react';
import { CssBaseline, InputLabel, Select, MenuItem, Button, Grid, Typography, Paper } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import FormInput from './CustomInputFeild';
import useStyles from './style';

import { AuthContext } from '../../Context/AuthProvider';

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const methods = useForm();
  const { login, currentUser } = useContext(AuthContext);
  const handleLogin = (async ({ UserName, PassWord }) => {
    const res = await login(UserName, PassWord);

    history.push('/');
  });
  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom> Login</Typography>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => handleLogin(data))}>
              <Grid
                container
                space={3}
                direction="column"
                justifyContent="center"
                alignItems="center"
                maxwidth="50%"
              >
                <FormInput name="UserName" label="Username" />
                <FormInput name="PassWord" label="Password" />
              </Grid>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <Button component={Link} variant="outlined" to="/Signup">Signup</Button>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
              </div>
            </form>
          </FormProvider>
        </Paper>
      </main>

    </>
  );
};

export default SignUp;
