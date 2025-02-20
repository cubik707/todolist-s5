import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { DomainTodolist } from "../../../../model/todolists-slice"
import { Task } from "./Task/Task"
import { useGetTasksQuery } from "../../../../api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const {data} = useGetTasksQuery(todolist.id)
  let tasksForTodolist = data?.items

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((tasksForTodolist) => tasksForTodolist.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((tasksForTodolist) => tasksForTodolist.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
