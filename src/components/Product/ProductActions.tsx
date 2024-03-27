import {
  CardActions,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { Product } from "../../types/ProductType";

import { useState, useTransition } from "react";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  addItemToCart,
  getCartItemById,
  setCart,
} from "../../slices/cartSlice";

type ProductActionsType = {
  product: Product;
  //addToCart: (id: number, quantity: number) => void;
};

export default function ProductActions({ product }: ProductActionsType) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const cart = useAppSelector((state) => state.cart.value);
  const dispatch = useAppDispatch();

  const cartItem = useAppSelector((state) =>
    getCartItemById(state, product.id)
  );

  async function postCart(prevCartState: any, quantity: number) {
    try {
      setIsLoading(true);
      const cartResponse = await fetch("/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.id, quantity }),
      });
      if (!cartResponse.ok) {
        dispatch(setCart(prevCartState));
      }
      const cartValue = await cartResponse.json();
      dispatch(setCart(cartValue));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

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
            {(isPending || isLoading || product.loading) && (
              <CircularProgress size={20} />
            )}
          </Box>
          <IconButton
            disabled={product.loading}
            aria-label="delete"
            size="small"
            onClick={() => {
              //product.loading = true;
              startTransition(() => {
                //addToCart(product.id, -1);
                dispatch(addItemToCart({ product, value: -1 }));
              });
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body1" component="div" mx={1}>
            {cartItem?.quantity || 0}
          </Typography>
          <IconButton
            disabled={product.loading}
            aria-label="add"
            size="small"
            onClick={() => {
              const prevCartState = {
                items: [...cart.items],
                totalPrice: cart.totalPrice,
                totalItems: cart.totalItems,
              };
              startTransition(() => {
                dispatch(addItemToCart({ product, value: 1 }));
              });
              postCart(prevCartState, 1);
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardActions>
    </>
  );
}
