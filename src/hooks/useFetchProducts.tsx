import { Product, ProductResponse } from "../types/ProductType";
import { useEffect, useState, useCallback } from "react";

export default function useFetchProducts(
  fetchFn: (page?: number, limit?: number) => Promise<ProductResponse>,
  page: number = 0,
  limit: number = 10
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
        const data = await fetchFn(page, limit);
        if (!data.hasMore) {
          setHasMore(false);
        }
        setData(data.products);
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
