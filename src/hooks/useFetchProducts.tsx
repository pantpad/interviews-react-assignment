import { Product, ProductResponse } from "../types/ProductType";
import { useEffect, useState, useCallback, useRef } from "react";

export default function useFetchProducts(
  fetchFn: (
    page?: number,
    limit?: number,
    signal?: AbortSignal
  ) => Promise<ProductResponse>,
  page: number = 0,
  limit: number = 10
) {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  //used to abort subsequent fetch requests
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchProducts = useCallback(
    async function fetchProducts() {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      try {
        setError(null);
        const responseData = await fetchFn(
          page,
          limit,
          abortControllerRef.current?.signal
        );
        if (!responseData.hasMore) {
          setHasMore(false);
        }
        //append data to existing data
        setData((prevData) => [...prevData, ...responseData.products]);
        setIsLoading(false);
      } catch (err: any) {
        if (err.name === "AbortError") {
          return;
        }
        console.log(err);
        setError(err);
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
