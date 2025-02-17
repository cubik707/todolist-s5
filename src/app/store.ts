import { tasksReducer, tasksSlice } from "../features/todolists/model/tasks-slice"
import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolists-slice"
import { appReducer, appSlice } from "./app-slice"
import { configureStore } from "@reduxjs/toolkit"
import { todolistApi } from "../features/todolists/api/todolistsApi"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./baseApi"

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
