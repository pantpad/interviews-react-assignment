import { Product } from "../types/ProductType";
import { useEffect, useState } from "react";

import { fetchProducts as fetchFN } from "../utils/endpoits";

export default function useFetchProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | Error>("");

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const data = await fetchFN();
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
