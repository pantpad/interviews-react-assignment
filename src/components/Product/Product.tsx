import { Card, Grid } from "@mui/material";

import { HeavyComponent } from "../../HeavyComponent.tsx";
import { Product } from "../../types/ProductType.ts";

import ProductActions from "./ProductActions.tsx";
import ProductContent from "./ProductContent.tsx";

type ProductItemType = {
  product: Product;
  addToCart: (id: number, quantity: number) => void;
};

export default function ProductItem({ product, addToCart }: ProductItemType) {
  return (
    <>
      <Grid item xs={4}>
        {/* Do not remove this */}
        <HeavyComponent />
        <Card style={{ width: "100%" }}>
          <ProductContent product={product} />
          <ProductActions product={product} addToCart={addToCart} />
        </Card>
      </Grid>
    </>
  );
}
