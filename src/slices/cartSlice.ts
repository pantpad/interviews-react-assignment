import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../types/ProductType";
// import { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store/store";

interface Cart {
  value: {
    items: Product[];
    totalItems: number;
    totalPrice: number;
  };
}

const initialState: Cart = {
  value: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state) => {
      console.log(state.value.items.push({} as Product));
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
