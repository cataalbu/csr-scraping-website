import { useEffect, useState } from 'react';
import { SignJWT } from 'jose';

export default function useProducts() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchProducts = async (reqPage) => {
    setLoading(true);
    const secret = import.meta.env.VITE_SECRET_KEY;
    const encoder = new TextEncoder();
    const secretKeyUint8Array = encoder.encode(secret);

    const token = await new SignJWT({ user: 'csr-app' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1m')
      .sign(secretKeyUint8Array);
    // const token = sign({ user: 'csr-app' }, secretKey, { expiresIn: '1m' });
    // const token = '';
    const response = await fetch(
      `http://localhost:8080/api/products?limit=20&page=${reqPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resData = await response.json();
    console.log(resData);
    setData(resData);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return {
    data,
    loading,
    page,
    setPage,
  };
}
