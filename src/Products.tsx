import { Box } from "@mui/material";

import useFetchProducts from "./hooks/useFetchProducts.tsx";
import { fetchProducts } from "./utils/endpoits.ts";

import ProductList from "./components/ProductsList.tsx";
import { Product } from "./types/ProductType.ts";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

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
  const [page, setPage] = useState(0);
  const {
    data: products,
    isLoading,
    error,
    setData: setProducts,
    hasMore,
  } = useFetchProducts(fetchProducts, page, ITEMS_PER_PAGE);

  // useEffect(() => {
  //   fetch("/products?limit=200")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data.products));
  // }, []);

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

  if (error) return <p>error... {error.toString()}</p>;
  if (isLoading && products.length === 0) return <p>is loading...</p>;

  function loadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <Box overflow="scroll" height="100%">
      <ProductList products={products} addToCart={addToCart} />
      <button onClick={loadMore}>Load More</button>
    </Box>
  );
};
