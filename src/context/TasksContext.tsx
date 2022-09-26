import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

import { Task, TasksReducer, TaskState } from '../reducers/tasks/reducer'
import {
  addNewTaskAction,
  finishCurrentTaskAction,
  interruptCurrentTaskAction,
} from '../reducers/tasks/actions'
import { differenceInSeconds } from 'date-fns'

export interface NewTaskFormData {
  task: string
  minutesAmount: number
}

interface TaskContextProps {
  tasks: Task[]
  activeTask: Task | undefined
  activeTaskId: string | null
  minutesInSecondsPassed: number
  createTask: (data: NewTaskFormData) => void
  finishTask: () => void
  interruptTask: () => void
  setMinutesInSeconds: (param: number) => void
}

interface TaskProviderProps {
  children: ReactNode
}

export const TasksContext = createContext({} as TaskContextProps)

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasksState, dispatch] = useReducer(
    TasksReducer,
    {
      tasks: [],
      activeTaskId: null,
    },
    () => {
      const storageAsJSON = localStorage.getItem(
        '@ignite-timer:tasks-state-1.0.0',
      )

      if (storageAsJSON) {
        return JSON.parse(storageAsJSON)
      }
    },
  )
  const { tasks, activeTaskId } = tasksState

  const activeTask = tasksState.tasks.find(
    (task: Task) => task.id === activeTaskId,
  )

  const [minutesInSecondsPassed, setMinutesInSecondsPassed] = useState(() => {
    if (activeTask) {
      return differenceInSeconds(new Date(), new Date(activeTask.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(tasksState)
    localStorage.setItem('@ignite-timer:tasks-state-1.0.0', stateJSON)
  }, [tasksState])

  function setMinutesInSeconds(seconds: number) {
    setMinutesInSecondsPassed(seconds)
  }

  function createTask(data: NewTaskFormData) {
    const id = String(new Date().getTime())
    const newTask: Task = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(addNewTaskAction(newTask))
    setMinutesInSecondsPassed(0)
  }

  function finishTask() {
    dispatch(finishCurrentTaskAction())
  }

  function interruptCurrentTask() {
    dispatch(interruptCurrentTaskAction())
  }

  function interruptTask() {
    interruptCurrentTask()
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        activeTask,
        activeTaskId,
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
