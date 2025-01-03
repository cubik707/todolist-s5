import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "../../app/app-slice"

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppError({ error: error.message }))
  dispatch(setAppStatus({ status: "failed" }))
}
