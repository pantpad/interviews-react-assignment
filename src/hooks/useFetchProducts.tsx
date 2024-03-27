import { Product, ProductResponse } from "../types/ProductType";
import { useEffect, useState, useCallback, useRef } from "react";

export default function useFetchProducts(
  fetchFn: (
    page?: number,
    limit?: number,
    query?: string,
    category?: string,
    signal?: AbortSignal
  ) => Promise<ProductResponse>,
  limit: number = 10,
  query: string = "",
  category: string = ""
) {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  //used to abort subsequent fetch requests
  const abortControllerRef = useRef<AbortController | null>(null);

  //This function is called at the start of the application & when the user makes a search or category change
  //It resets the pagination to page 0
  //It replaces the existing data with the new data
  const fetchProducts = useCallback(
    async function fetchProducts() {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      setHasMore(true);
      setIsLoading(true);
      setPage(0);
      try {
        setError(null);
        const responseData = await fetchFn(
          0,
          limit,
          query,
          category,
          abortControllerRef.current?.signal
        );
        if (!responseData.hasMore) {
          setHasMore(false);
        }
        //append data to existing data
        setData(responseData.products);
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
    [query, category]
  );

  //This function is called when the user scrolls to the bottom of the page
  //It sets the current pagination to the next page
  //Appends data to the currently existing data
  async function fetchMore() {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    setPage((prevPage) => prevPage + 1);
    setIsLoadingMore(true);
    try {
      setError(null);
      const responseData = await fetchFn(
        page + 1,
        limit,
        query,
        category,
        abortControllerRef.current?.signal
      );
      if (!responseData.hasMore) {
        setHasMore(false);
      }
      //append data to existing data
      setData((prevData) => [...prevData, ...responseData.products]);
      setIsLoadingMore(false);
    } catch (err: any) {
      if (err.name === "AbortError") {
        return;
      }
      console.log(err);
      setError(err);
      setIsLoadingMore(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { data, isLoading, error, setData, hasMore, fetchMore, isLoadingMore };
}
