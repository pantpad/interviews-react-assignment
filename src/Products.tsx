import { memo } from "react";

import { Box, CircularProgress } from "@mui/material";

import useIntersectionObserver from "./hooks/useIntersectionObserver.tsx";
import useFetchProducts from "./hooks/useFetchProducts.tsx";
import { fetchProducts } from "./utils/endpoints.ts";

import ProductSkeleton from "./components/Product/ProductSkeleton.tsx";
import Error from "./components/Error.tsx";
import ProductList from "./components/ProductsList.tsx";
import { Product } from "./types/ProductType.ts";

const ITEMS_PER_PAGE = 200;

export type Cart = {
  items: Product[];
  totalPrice: number;
  totalItems: number;
};

export const Products = memo(
  ({ filter, category }: { filter: string; category: string }) => {
    const {
      data: products,
      isLoading,
      error,
      hasMore,
      fetchMore,
      isLoadingMore,
    } = useFetchProducts(fetchProducts, ITEMS_PER_PAGE, filter, category);

    function loadMore() {
      fetchMore();
    }

    //if last element is visible + there are more products to load + it is not currently loading other things
    //then fire the load more callback
    const lastElement = useIntersectionObserver<HTMLDivElement>(loadMore, [
      !isLoading,
      !isLoadingMore,
      hasMore,
    ]);

    if (error) return <Error />;
    if (isLoading) return <ProductSkeleton />;

    return (
      <>
        <p>{filter}</p> <p>{category}</p>
        <Box overflow="scroll" height="100%">
          <ProductList products={products} lastElementRef={lastElement} />
          <Box
            display="flex"
            position={"relative"}
            justifyContent="center"
            height="300px"
            mt={2}
          >
            {isLoadingMore && <CircularProgress size={40} />}
          </Box>
        </Box>
      </>
    );
  }
);
