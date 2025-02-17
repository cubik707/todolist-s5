import { createSlice } from "@reduxjs/toolkit"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: (create) => {
    return {
      changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode
      }),
      setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
        state.status = action.payload.status
      }),
      setAppError: create.reducer<{ error: string | null }>((state, action) => {
        state.error = action.payload.error
      }),
      setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      }),
    }
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: state => state.isLoggedIn,
  },
})

export const appReducer = appSlice.reducer
export const { changeTheme, setAppStatus, setAppError, setIsLoggedIn } = appSlice.actions
export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
export const { selectThemeMode, selectAppStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors