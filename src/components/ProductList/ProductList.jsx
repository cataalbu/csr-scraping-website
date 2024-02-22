import { Sheet } from '@mui/joy';

import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.css';
import { Pagination } from '@mui/material';
import useProducts from '../../hooks/useProducts';

export default function ProductList() {
  const { data, loading, page, setPage } = useProducts();
  const handleChangePage = (event, page) => {
    setPage(page);
  };
  return (
    <Sheet
      variant="soft"
      color="primary"
      className={styles['product-list-container']}
    >
      {data && data.data && (
        <>
          <div className={styles['product-items-container']}>
            {data?.data.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                loading={loading}
              />
            ))}
          </div>
          <Pagination
            count={data?.totalPages}
            page={page}
            onChange={handleChangePage}
            className={styles['pagination']}
          />
        </>
      )}
    </Sheet>
  );
}
