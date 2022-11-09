import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./slices/client-slice";

const store = configureStore({
    reducer: {
        clientReducer: clientSlice.reducer
    },
});

export default store;