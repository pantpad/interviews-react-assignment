import { useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import useFetchProducts from "./hooks/useFetchProducts.tsx";
import { fetchProducts } from "./utils/endpoits.ts";

import ProductList from "./components/ProductsList.tsx";
import { Product } from "./types/ProductType.ts";
import useIntersectionObserver from "./hooks/useIntersectionObserver.tsx";

const ITEMS_PER_PAGE = 1;

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

  function loadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  //if last element is visible + there are more products to load + it is not currently loading other things
  //then fire the load more callback
  const lastElement = useIntersectionObserver<HTMLDivElement>(loadMore, [
    !isLoading,
    hasMore,
  ]);

  //not needed anymore, logic has been placed inside useFetchProducts hooks
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

  if (error)
    return (
      <p onLoad={() => console.log(error.toString())}>
        error... check the console for more details
      </p>
    );
  if (isLoading && products.length === 0)
    return <CircularProgress size={100} />;

  return (
    <>
      <Box overflow="scroll" min-height="100vh" bgcolor="red">
        <ProductList
          products={products}
          addToCart={addToCart}
          lastElementRef={lastElement}
        />
        <Box
          display="flex"
          position={"relative"}
          justifyContent="center"
          height="300px"
          mt={2}
        >
          {isLoading && <CircularProgress size={40} />}
        </Box>
      </Box>
    </>
  );
};
