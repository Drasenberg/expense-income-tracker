import { configureStore } from "@reduxjs/toolkit";

import amountReducer from './amount';
import authReducer from './auth';

const store = configureStore({
  reducer: {
    amount: amountReducer,
    auth: authReducer
  }
})

export default store;