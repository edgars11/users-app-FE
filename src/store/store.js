import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/Auth/authSlice";

export const store = configureStore({
    reducer:{
        users: usersSlice.reducer,
        auth: authSlice.reducer,
    }
})