import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import ProductList from "./components/ProductsList.tsx";

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  itemInCart: number;
  loading: boolean;
};

export type Cart = {
  items: Product[];
  totalPrice: number;
  totalItems: number;
};
export const Products = ({
  onCartChange,
}: {
  onCartChange: (cart: Cart) => void;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  console.log("sto partendo");
  useEffect(() => {
    fetch("/products?limit=200")
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  function addToCart(productId: number, quantity: number) {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            loading: true,
          };
        }
        return product;
      })
    );

    fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    }).then(async (response) => {
      if (response.ok) {
        const cart = await response.json();
        setProducts(
          products.map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                itemInCart: (product.itemInCart || 0) + quantity,
                loading: false,
              };
            }
            return product;
          })
        );
        onCartChange(cart);
      }
    });
  }
  console.log("products");
  console.log(products[33]);
  return (
    <Box overflow="scroll" height="100%">
      <ProductList products={products} addToCart={addToCart} />
    </Box>
  );
};
