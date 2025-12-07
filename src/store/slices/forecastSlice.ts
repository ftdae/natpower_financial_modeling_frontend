import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  afryDropdown: {},
  afryProcessedTableRows: {},
  afryHeaderKeysData: [],
  baringaDropdown: {},
  baringaProcessedTableRows: {},
  baringaHeaderKeysData: [],
  modoDropdown: {},
  modoProcessedTableRows: {},
  modoHeaderKeysData: [],
};

const forecastSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // AFRY reducers
    setAfryDropdown(state, action) {
      const { field, value } = action.payload;
      if (
        !value &&
        typeof action.payload === "object" &&
        !Array.isArray(action.payload)
      ) {
        state.afryDropdown = { ...action.payload };
      } else if (action.payload.field && action.payload.value !== undefined) {
        state.afryDropdown = {
          ...state.afryDropdown,
          [field]: value,
        };
      }
    },
    setAfryProcessedRows(state, action) {
      state.afryProcessedTableRows = action.payload;
    },
    setAfryHeaderKeys(state, action) {
      state.afryHeaderKeysData = action.payload;
    },

    // BARINGA reducers
    setBaringaDropdown(state, action) {
      const { field, value } = action.payload;
      if (
        !value &&
        typeof action.payload === "object" &&
        !Array.isArray(action.payload)
      ) {
        state.baringaDropdown = { ...action.payload };
      } else if (action.payload.field && action.payload.value !== undefined) {
        state.baringaDropdown = {
          ...state.baringaDropdown,
          [field]: value,
        };
      }
    },
    setBaringaProcessedRows(state, action) {
      state.baringaProcessedTableRows = action.payload;
    },
    setBaringaHeaderKeys(state, action) {
      state.baringaHeaderKeysData = action.payload;
    },

    // MODO reducers
    setModoDropdown(state, action) {
      const { field, value } = action.payload;
      if (
        !value &&
        typeof action.payload === "object" &&
        !Array.isArray(action.payload)
      ) {
        state.modoDropdown = { ...action.payload };
      } else if (action.payload.field && action.payload.value !== undefined) {
        state.modoDropdown = {
          ...state.modoDropdown,
          [field]: value,
        };
      }
    },
    setModoProcessedRows(state, action) {
      state.modoProcessedTableRows = action.payload;
    },
    setModoHeaderKeys(state, action) {
      state.modoHeaderKeysData = action.payload;
    },
  },
});

export const {
  setAfryDropdown,
  setAfryProcessedRows,
  setAfryHeaderKeys,
  setBaringaDropdown,
  setBaringaProcessedRows,
  setBaringaHeaderKeys,
  setModoDropdown,
  setModoProcessedRows,
  setModoHeaderKeys,
} = forecastSlice.actions;

export default forecastSlice;
