import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { CommerceContext } from '../../Context/CommerceProvider';
import Product from './Product/Product';
import useStyles from './styles';

const Products = () => {
  const classes = useStyles();
  const { products } = useContext(CommerceContext);
  if (!products?.length) return <p>Loading...</p>;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;

