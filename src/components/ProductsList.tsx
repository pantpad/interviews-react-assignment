import { Grid } from "@mui/material";
import { Product } from "../types/ProductType";
import ProductItem from "./Product/Product";

type ProductListType = {
  products: Product[];
  addToCart: (id: number, quantity: number) => void;
  lastElementRef: React.Ref<HTMLDivElement>;
};

export default function ProductList({
  products,
  lastElementRef,
}: ProductListType) {
  return (
    <Grid container spacing={2} p={2} position={"relative"}>
      {products.map((product, i, products) => (
        <ProductItem
          key={product.id}
          product={product}
          ref={products.length - 1 === i ? lastElementRef : null}
        />
      ))}
    </Grid>
  );
}
