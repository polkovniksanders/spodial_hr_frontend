import { configureStore } from '@reduxjs/toolkit';
import elementSizesReducer from './elementSizesSlice';

export const store = configureStore({
  reducer: {
    elementSizes: elementSizesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
