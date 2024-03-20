import { CardMedia, CardContent, Typography } from "@mui/material";

import { Product } from "./ProductType";

type ProductContentType = {
  product: Product;
};

export default function ProductContent({ product }: ProductContentType) {
  return (
    <>
      <CardMedia component="img" height="150" image={product.imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </Typography>
      </CardContent>
    </>
  );
}
