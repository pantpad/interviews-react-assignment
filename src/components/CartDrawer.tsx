import { Box } from "@mui/material";

import { useAppSelector } from "../store/hooks";

export default function CartDrawer() {
  const cart = useAppSelector((state) => state.cart.value);
  console.log(cart.items);
  return <Box p={2} sx={{ minWidth: "300px" }}></Box>;
}
