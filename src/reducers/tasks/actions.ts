import { Task } from './reducer'

export enum ActionTypes {
  ADD_NEW_TASK = 'ADD_NEW_TASK',
  INTERRUPT_CURRENT_TASK = 'INTERRUPT_CURRENT_TASK',
  FINISH_CURRENT_TASK = 'FINISH_CURRENT_TASK',
}

export function addNewTaskAction(newTask: Task) {
  return {
    type: ActionTypes.ADD_NEW_TASK,
    payload: {
      newTask,
    },
  }
}

export function interruptCurrentTaskAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_TASK,
  }
}

export function finishCurrentTaskAction() {
  return {
    type: ActionTypes.FINISH_CURRENT_TASK,
  }
}
