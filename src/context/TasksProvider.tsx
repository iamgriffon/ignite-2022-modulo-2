import { createContext, ReactNode, useContext, useState } from 'react'
import { Task } from '../pages/Home'
import * as zod from 'zod'

export const newTaskFormValidationSchema = zod.object({
  task: zod.string().min(5, 'Task name must have more than 5 characters'),
  minutesAmount: zod
    .number()
    .min(1, 'Task duration must be longer than 1 minute')
    .max(60, 'Task duration cannot be longer than 5 minutes'),
})

export type NewTaskFormData = zod.infer<typeof newTaskFormValidationSchema>

interface TaskContextProps {
  tasks: Task[]
  activeTask: Task | undefined
  activeTaskId: string | null
  finishTask: () => void
  minutesInSecondsPassed: number
  handleSetActiveTaskId: (param: string | null) => void
  setMinutesInSeconds: (param: number) => void
  createTask: (data: NewTaskFormData) => void
  interruptTask: () => void
}

interface TaskProviderProps {
  children: ReactNode
}

export const TasksContext = createContext({} as TaskContextProps)

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const activeTask = tasks.find((task) => task.id === activeTaskId)
  const [minutesInSecondsPassed, setMinutesInSecondsPassed] = useState(0)

  function setMinutesInSeconds(seconds: number) {
    setMinutesInSecondsPassed(seconds)
  }

  function handleSetActiveTaskId(id: string | null) {
    setActiveTaskId(id)
  }

  function createTask(data: NewTaskFormData) {
    const id = String(new Date().getTime())
    const newTask: Task = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setTasks((prevState) => [...prevState, newTask])
    setActiveTaskId(id)
    setMinutesInSecondsPassed(0)
  }

  function interruptTask() {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === activeTaskId) {
          return { ...task, interruptedDate: new Date() }
        } else {
          return task
        }
      }),
    )
    setActiveTaskId(null)
  }

  function finishTask() {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === activeTaskId) {
          return { ...task, finishedDate: new Date() }
        } else {
          return task
        }
      }),
    )
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        activeTask,
        activeTaskId,
        handleSetActiveTaskId,
        finishTask,
        createTask,
        interruptTask,
        minutesInSecondsPassed,
        setMinutesInSeconds,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export const useTask = () => useContext(TasksContext)
