import { createSlice } from "@reduxjs/toolkit";

const initialAmountState = { amount: 0 };

const amountSlice = createSlice({
  name: 'amount',
  initialState: initialAmountState,
  reducers: {
    addAmount(state, action) {
      state.amount = state.amount + action.payload;
    },
    removeAmount(state, action) {
      state.amount = state.amount - action.payload;
    }
  }
});

export const amountActions = amountSlice.actions;

export default amountSlice.reducer;