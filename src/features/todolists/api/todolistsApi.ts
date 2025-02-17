import { BaseResponse } from "common/types"
import { Todolist } from "./todolistsApi.types"
import { DomainTodolist } from "../model/todolists-slice"
import { baseApi } from "../../../app/baseApi"

export const todolistApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTodolists: builder.query<DomainTodolist[], void>({
        query: () => "todo-lists",
        transformResponse(todolists: Todolist[]): DomainTodolist[] {
          return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        },
        providesTags: ["Todolist"],
      }),
      createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: (title) => ({
          url: "todo-lists",
          method: "POST",
          body: { title },
        }),
        invalidatesTags: ["Todolist"],
      }),
      removeTodolist: builder.mutation<BaseResponse, string>({
        query: (id) => ({
          method: "DELETE",
          url: `todo-lists/${id}`,
        }),
        invalidatesTags: ["Todolist"],
      }),
      updateTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
        query: ({ id, title }) => ({
          method: "PUT",
          url: `todo-lists/${id}`,
          body: {
            title,
          },
        }),
        invalidatesTags: ["Todolist"],
      }),
    }
  },
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistApi

