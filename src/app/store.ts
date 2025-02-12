import { authReducer, authSlice } from "../features/auth/model/auth-slice"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasks-slice"
import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolists-slice"
import { appReducer, appSlice } from "./app-slice"
import { configureStore } from "@reduxjs/toolkit"
import { todolistApi } from "../features/todolists/api/todolistsApi"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [todolistApi.reducerPath]: todolistApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todolistApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
