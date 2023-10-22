/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const apiSlice = createSlice({
  name: "card",
  initialState: {
    API_URL: "https://6516660f09e3260018c9b5e8.mockapi.io/Cards",
  },
  reducers: {},
});

export const APIURL = (state) => state.card.API_URL;

export default apiSlice.reducer;
