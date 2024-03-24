import { Product, ProductResponse } from "../types/ProductType";
import { useEffect, useState } from "react";

export default function useFetchProducts(
  fetchFn: (page?: number, limit?: number) => Promise<ProductResponse>,
  page: number = 0,
  limit: number = 10
) {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | Error>("");

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const data = await fetchFn(page, limit);
        console.log(data);
        setData(data.products);
      } catch (err) {
        let message;

        if (err instanceof Error) message = err.message;
        else message = String(error);

        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { data, isLoading, error, setData };
}
