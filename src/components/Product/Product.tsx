import { Card, Grid } from "@mui/material";

import { HeavyComponent } from "../../HeavyComponent.tsx";
import { Product } from "../../types/ProductType.ts";

import ProductActions from "./ProductActions.tsx";
import ProductContent from "./ProductContent.tsx";
import { forwardRef } from "react";

type ProductItemType = {
  product: Product;
  addToCart: (id: number, quantity: number) => void;
};

export default forwardRef(function ProductItem(
  { product }: ProductItemType,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <>
      <Grid item xs={4}>
        {/* Do not remove this */}
        <HeavyComponent />
        <Card style={{ width: "100%" }} ref={ref}>
          <ProductContent product={product} />
          <ProductActions product={product} />
        </Card>
      </Grid>
    </>
  );
});
