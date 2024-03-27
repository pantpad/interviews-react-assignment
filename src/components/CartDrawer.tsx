import { Box } from "@mui/material";

import { useAppSelector } from "../store/hooks";

export default function CartDrawer() {
  const cart = useAppSelector((state) => state.cart.value);
  return (
    <Box p={2} sx={{ minWidth: "300px" }}>
      {cart.items.map((item) => (
        <Box key={item.product.id}>
          {item.product.name} x {item.quantity}
        </Box>
      ))}
    </Box>
  );
}
