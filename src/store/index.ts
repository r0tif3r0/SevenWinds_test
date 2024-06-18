import { configureStore } from "@reduxjs/toolkit";
import rowsReducer from './rowSlice';

const store = configureStore ({
    reducer: {
        rows: rowsReducer,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch