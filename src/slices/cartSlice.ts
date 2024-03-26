import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/ProductType";

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
  reducers: {},
});
