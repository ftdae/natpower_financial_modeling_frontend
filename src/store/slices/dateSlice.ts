import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState {
  date: { [key: string]: string };
}

const initialState: DateState = {
  date: {},
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    addDate: (state, action: PayloadAction<{ key: string; value: string }>) => {
      const { key, value } = action.payload;
      state.date[key] = value;
    },
    removeDate: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state.date[key];
    },
    updateDate: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      if (state.date[key] !== undefined) {
        state.date[key] = value;
      }
    },
    clearDate: (state) => {
      state.date = {};
    },
  },
});

export const { addDate, removeDate, updateDate, clearDate } = dateSlice.actions;

export const selectDate = (state: { date: DateState }) => state.date;

export default dateSlice.reducer;
