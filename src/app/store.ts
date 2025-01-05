import { combineReducers, UnknownAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/auth/model/auth-slice"
import { tasksReducer } from "../features/todolists/model/tasks-slice"
import { todolistsReducer } from "../features/todolists/model/todolists-slice"
import { appReducer } from "./app-slice"
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

export type AppDispatch = typeof store.dispatch

