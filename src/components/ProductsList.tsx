import { Grid } from "@mui/material";
import { Product } from "../types/ProductType";
import ProductItem from "./Product/Product";

type ProductListType = {
  products: Product[];
  addToCart: (id: number, quantity: number) => void;
};

export default function ProductList({ products, addToCart }: ProductListType) {
  console.log(products);
  return (
    <Grid container spacing={2} p={2}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} addToCart={addToCart} />
      ))}
    </Grid>
  );
}
