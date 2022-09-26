import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface Task {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface TaskState {
  tasks: Task[]
  activeTaskId: string | null
}

export function TasksReducer(state: TaskState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_TASK:
      return produce(state, (draft) => {
        draft.tasks.push(action.payload.newTask)
        draft.activeTaskId = action.payload.newTask.id
      })

    case ActionTypes.INTERRUPT_CURRENT_TASK:
      return produce(state, (draft) => {
        const currentTaskId = state.tasks.findIndex((task) => {
          return task.id === state.activeTaskId
        })
        if (currentTaskId < 0) {
          return state
        }
        draft.activeTaskId = null
        draft.tasks[currentTaskId].interruptedDate = new Date()
      })

    case ActionTypes.FINISH_CURRENT_TASK:
      return produce(state, (draft) => {
        const currentTaskId = state.tasks.findIndex((task) => {
          return task.id === state.activeTaskId
        })
        if (currentTaskId < 0) {
          return state
        }
        draft.activeTaskId = null
        draft.tasks[currentTaskId].finishedDate = new Date()
      })

    default:
      return state
  }
}
