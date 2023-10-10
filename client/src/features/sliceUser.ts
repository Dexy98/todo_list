import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUsers } from "../vite-env";

export const utente = createSlice({
  name: "utente",
  initialState: {},
  reducers: {
    datiUtente(state, action: PayloadAction<TUsers>) {
      state = [action.payload];
    },
  },
});

export const { datiUtente } = utente.actions;
