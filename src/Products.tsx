import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import ProductList from "./components/ProductsList.tsx";
import { Product } from "./types/ProductType.ts";

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
    //toggle current product loading state to true in order to:
    //disable further button pression
    //make spinner load
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
    //fetch to update cart on db,returns updated cart object set to the cart state in app using onCartChange
    //inside we also toggle the current product loadingState to false.
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
