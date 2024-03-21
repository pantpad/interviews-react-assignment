import { Product } from "../types/ProductType";
import { useEffect, useState } from "react";
export default function useFetchProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const response = await fetch("/products?limit=200");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        setData(products.products);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { data, isLoading, error, setData };
}
