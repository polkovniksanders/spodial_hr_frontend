import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ElementSizePayload {
  id: string;
  height: number;
}

interface ElementSizesState {
  sizes: Record<string, number>;
}

const initialState: ElementSizesState = {
  sizes: {},
};

export const elementSizesSlice = createSlice({
  name: 'elementSizes',
  initialState,
  reducers: {
    setElementSize: (state, action: PayloadAction<ElementSizePayload>) => {
      const { id, height } = action.payload;
      state.sizes[id] = height;
    },
  },
});

export const { setElementSize } = elementSizesSlice.actions;
export default elementSizesSlice.reducer;
