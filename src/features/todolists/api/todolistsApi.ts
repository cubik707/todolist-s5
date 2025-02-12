import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { Todolist } from "./todolistsApi.types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { DomainTodolist } from "../model/todolists-slice"

export const todolistApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
      headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`)
    },
  }),
  endpoints: (builder) => {
    return {
      getTodolists: builder.query<DomainTodolist[], void>({
        query: () => "todo-lists",
        transformResponse(todolists: Todolist[]): DomainTodolist[] {
          return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        },
      }),
      createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: (title) => ({
          url: "todo-lists",
          method: "POST",
          body: { title },
        }),
      }),
      removeTodolist: builder.mutation<BaseResponse, string>({
        query: (id) => ({
          method: "DELETE",
          url: `todo-lists/${id}`,
        }),
      }),
      updateTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
        query: ({ id, title }) => ({
          method: "PUT",
          url: `todo-lists/${id}`,
          body: {
            title,
          },
        }),
      }),
    }
  },
})

export const { useGetTodolistsQuery, useCreateTodolistMutation, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } = todolistApi

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { title, id } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
}
