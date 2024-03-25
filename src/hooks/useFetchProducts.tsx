import { Product, ProductResponse } from "../types/ProductType";
import { useEffect, useState, useCallback } from "react";

export default function useFetchProducts(
  fetchFn: (page?: number, limit?: number) => Promise<ProductResponse>,
  page: number = 0,
  limit: number = 0
) {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | Error>("");
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(
    async function fetchProducts() {
      setIsLoading(true);
      try {
        setError("");
        const responseData = await fetchFn(page, limit);
        if (!responseData.hasMore) {
          setHasMore(false);
        }
        if (data.length > 0) {
          setData((prevData) => {
            return [...prevData, ...responseData.products];
          });
        } else {
          setData(responseData.products);
        }
      } catch (err) {
        let message;

        if (err instanceof Error) message = err.message;
        else message = String(error);

        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [page, limit]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { data, isLoading, error, setData, hasMore };
}
