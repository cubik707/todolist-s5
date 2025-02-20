import { BaseResponse } from "common/types"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "../../../app/baseApi"

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => `todo-lists/${todolistId}/tasks`,
    }),
    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: ({ title, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
    }),
    deleteTask: builder.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        method: "DELETE",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
      }),
    }),
    updateTask: builder.mutation<
      BaseResponse<{ item: DomainTask }>,
      {
        todolistId: string
        taskId: string
        model: UpdateTaskModel
      }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: "PUT",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi

