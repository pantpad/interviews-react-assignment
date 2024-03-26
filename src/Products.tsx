import { memo } from "react";

import { Box, CircularProgress } from "@mui/material";

import useFetchProducts from "./hooks/useFetchProducts.tsx";
import { fetchProducts } from "./utils/endpoints.ts";

import ProductList from "./components/ProductsList.tsx";
import { Product } from "./types/ProductType.ts";
import useIntersectionObserver from "./hooks/useIntersectionObserver.tsx";
import Error from "./components/Error.tsx";

const ITEMS_PER_PAGE = 200;

export type Cart = {
  items: Product[];
  totalPrice: number;
  totalItems: number;
};

export const Products = memo(
  ({
    onCartChange,
    filter,
    category,
  }: {
    onCartChange: (cart: Cart) => void;
    filter: string;
    category: string;
  }) => {
    const {
      data: products,
      isLoading,
      error,
      setData: setProducts,
      hasMore,
      fetchMore,
    } = useFetchProducts(fetchProducts, ITEMS_PER_PAGE, filter, category);

    function loadMore() {
      fetchMore();
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
      setProducts((prevProducts) => {
        const clonedProducts = [...prevProducts];
        clonedProducts[productId] = {
          ...clonedProducts[productId],
          loading: true,
          itemInCart: (clonedProducts[productId].itemInCart || 0) + quantity,
        };
        return clonedProducts;
      });
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
          console.log(cart);
          setProducts((prevProducts) => {
            const clonedProducts = [...prevProducts];
            clonedProducts[productId] = {
              ...clonedProducts[productId],
              loading: false,
            };
            return clonedProducts;
          });
          onCartChange(cart);
        }
      });
    }

    if (error) return <Error />;
    if (isLoading && products.length === 0)
      return <CircularProgress size={100} />;

    return (
      <>
        <p>{filter}</p> <p>{category}</p>
        <Box overflow="scroll" height="100%">
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
  }
);
