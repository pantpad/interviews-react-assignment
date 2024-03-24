import { Product } from "../types/ProductType";
import { useEffect, useState } from "react";
export default function useFetchProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | Error>("");

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const response = await fetch("/products?page=0&limit=1");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const products = await response.json();
        console.log(products);
        setData(products.products);
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
