import { Dispatch } from "redux"
import { RequestStatus } from "../../../app/app-slice"
import { Todolist } from "../api/todolistsApi.types"
import { createSlice, current } from "@reduxjs/toolkit"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      const newTodolist: DomainTodolist = {
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      }
      state.unshift(newTodolist)
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      console.log(current(state))
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
        console.log(current(state))
      }
    }),
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const todolist = state.find((todo) => todo.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find((todo) => todo.id === action.payload.id)
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
      }
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      action.payload.todolists.forEach((tl) => {
        state.push({ ...tl, filter: "all", entityStatus: "idle" })
      })
    }),
    clearTodolists: create.reducer(() => {
      return []
    }),
  }),
  selectors: {
    selectTodolists: (state) => state
  }
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  addTodolist,
  removeTodolist,
  setTodolists,
  clearTodolists,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors

// Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  // dispatch(setAppStatus({ status: "loading" }))
  // todolistsApi
  //   .getTodolists()
  //   .then((res) => {
  //     dispatch(setAppStatus({ status: "succeeded" }))
  //     dispatch(setTodolists({ todolists: res.data }))
  //   })
  //   .catch((error) => {
  //     handleServerNetworkError(error, dispatch)
  //   })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  // dispatch(setAppStatus({ status: "loading" }))
  // todolistsApi
  //   .createTodolist(title)
  //   .then((res) => {
  //     if (res.data.resultCode === ResultCode.Success) {
  //       dispatch(setAppStatus({ status: "succeeded" }))
  //       dispatch(addTodolist({ todolist: res.data.data.item }))
  //     } else {
  //       handleServerAppError(res.data, dispatch)
  //     }
  //   })
  //   .catch((error) => {
  //     handleServerNetworkError(error, dispatch)
  //   })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  // dispatch(setAppStatus({ status: "loading" }))
  // dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
  // todolistsApi
  //   .deleteTodolist(id)
  //   .then((res) => {
  //     if (res.data.resultCode === ResultCode.Success) {
  //       dispatch(setAppStatus({ status: "succeeded" }))
  //       dispatch(removeTodolist({ id }))
  //     } else {
  //       handleServerAppError(res.data, dispatch)
  //     }
  //   })
  //   .catch((error) => {
  //     dispatch(changeTodolistEntityStatus({ id, entityStatus: "failed" }))
  //     handleServerNetworkError(error, dispatch)
  //   })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
  // dispatch(setAppStatus({ status: "loading" }))
  // todolistsApi
  //   .updateTodolist(arg)
  //   .then((res) => {
  //     if (res.data.resultCode === ResultCode.Success) {
  //       dispatch(setAppStatus({ status: "succeeded" }))
  //       dispatch(changeTodolistTitle(arg))
  //     } else {
  //       handleServerAppError(res.data, dispatch)
  //     }
  //   })
  //   .catch((error) => {
  //     handleServerNetworkError(error, dispatch)
  //   })
}
