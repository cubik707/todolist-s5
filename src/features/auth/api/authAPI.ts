import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { LoginArgs } from "./authAPI.types"
import { baseApi } from "../../../app/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
        query: () => 'auth/me',
      }),
      login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
        query: payload => {
          return {
            method: 'POST',
            url: 'auth/login',
            body: payload,
          }
        },
      }),
      logout: builder.mutation<BaseResponse, void>({
        query: () => {
          return {
            method: 'DELETE',
            url: 'auth/login',
          }
        },
      }),
    }
  }
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi

export const _authApi = {
  login(payload: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
  },
  logout() {
    return instance.delete<BaseResponse>("auth/login")
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
  },
}
