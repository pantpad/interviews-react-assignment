import { Grid } from "@mui/material";
import { Product } from "../Products";
import ProductItem from "./Product";

type ProductListType = {
  products: Product[];
  addToCart: (id: number, quantity: number) => void;
};

export default function ProductList({ products, addToCart }: ProductListType) {
  return (
    <Grid container spacing={2} p={2}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} addToCart={addToCart} />
      ))}
    </Grid>
  );
}
