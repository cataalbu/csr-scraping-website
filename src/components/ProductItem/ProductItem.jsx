import { AspectRatio, Box, Card, Skeleton, Typography } from '@mui/joy';
import { Rating } from '@mui/material';

import styles from './ProductItem.module.css';

export default function ProductItem({ product, loading = false }) {
  return (
    <Card
      className={styles['product-item-container']}
      variant="soft"
      data-id={product._id}
    >
      <AspectRatio ratio="1/1">
        <Skeleton width={'100%'} loading={loading && product}>
          <a href={product && `http://localhost:5173/${product.id}`}>
            <img
              src={product.imageUrl}
              alt="product-image"
              className={styles['product-item-image']}
            />
          </a>
        </Skeleton>
      </AspectRatio>
      <Box>
        <Skeleton loading={loading}>
          {loading ? (
            'Lorem ipsum is placeholder text commonly used in the'
          ) : (
            <Typography className={styles['product-item-title']}>
              {product.name}
            </Typography>
          )}
        </Skeleton>
      </Box>

      <Box>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={30}
            loading={loading}
          />
        ) : (
          <Rating name="product-rating" value={product.rating} readOnly />
        )}
      </Box>

      <Typography className={styles['product-item-price']}>
        <Skeleton loading={loading}>
          {loading ? '100000 $' : `$${product.price}`}
        </Skeleton>
      </Typography>
    </Card>
  );
}
