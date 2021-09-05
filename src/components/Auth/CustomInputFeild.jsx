import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

const FormInput = ({ name, label }) => {
  const { control } = useFormContext();
  const isError = false;
  return (
    <Grid item xs={12}>
      <Controller
        as={TextField}
        name={name}
        control={control}
        label={label}
        fullwidth
        error={isError}
      />
    </Grid>
  );
};

export default FormInput;
