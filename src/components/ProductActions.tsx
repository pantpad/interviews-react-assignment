import {
  CardActions,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { Product } from "../Products";

type ProductActionsType = {
  product: Product;
  addToCart: (id: number, quantity: number) => void;
};

export default function ProductActions({
  product,
  addToCart,
}: ProductActionsType) {
  return (
    <>
      <CardActions>
        <Typography variant="h6" component="div">
          ${product.price}
        </Typography>
        <Box flexGrow={1} />
        <Box
          position="relative"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Box
            position="absolute"
            left={0}
            right={0}
            top={0}
            bottom={0}
            textAlign="center"
          >
            {product.loading && <CircularProgress size={20} />}
          </Box>
          <IconButton
            disabled={product.loading}
            aria-label="delete"
            size="small"
            onClick={() => addToCart(product.id, -1)}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body1" component="div" mx={1}>
            {product.itemInCart || 0}
          </Typography>
          <IconButton
            disabled={product.loading}
            aria-label="add"
            size="small"
            onClick={() => addToCart(product.id, 1)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardActions>
    </>
  );
}
