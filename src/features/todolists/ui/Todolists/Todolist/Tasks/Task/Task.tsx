import { EditableSpan } from "common/components"
import { TaskStatus } from "common/enums"
import { DomainTask, UpdateTaskModel } from "../../../../../api/tasksApi.types"
import { DomainTodolist } from "../../../../../model/todolists-slice"
import { getListItemSx } from "./Task.styles"
import { ChangeEvent } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  
  const [removeTask] = useDeleteTaskMutation();
  
  const removeTaskHandler = () => {
    removeTask({taskId: task.id, todolistId: todolist.id})
  }

  const [updateTask] = useUpdateTaskMutation();

  const createUpdateModel = (overrides: Partial<UpdateTaskModel> = {}): UpdateTaskModel => ({
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    ...overrides, // Перезаписываем только переданные значения
  });

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateTask({
      taskId: task.id,
      todolistId: todolist.id,
      model: createUpdateModel({ status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New }),
    });
  };

  const changeTaskTitleHandler = (title: string) => {
    updateTask({
      taskId: task.id,
      todolistId: todolist.id,
      model: createUpdateModel({ title }),
    });
  };

  const disabled = todolist.entityStatus === "loading"

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={disabled}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={disabled} />
      </div>
      <IconButton onClick={removeTaskHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
