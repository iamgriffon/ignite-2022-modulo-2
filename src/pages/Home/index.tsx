import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewTaskForm } from './components/NewTaskForm'
import { Countdown } from './components/Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  NewTaskFormData,
  newTaskFormValidationSchema,
  useTask,
} from '../../context/TasksProvider'

export interface Task {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { activeTask, createTask, interruptTask } = useTask()

  const { handleSubmit, watch, reset } = newTaskForm

  const watcher = watch('task') && watch('minutesAmount')

  const isSubmitDisabled = !watcher

  function handleCreateTask(data: NewTaskFormData) {
    createTask(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateTask)}>
        <FormProvider {...newTaskForm}>
          <NewTaskForm />
        </FormProvider>
        <Countdown />

        {activeTask ? (
          <StopCountdownButton
            disabled={!isSubmitDisabled}
            onClick={interruptTask}
            type="button"
          >
            <HandPalm size={24} />
            Stop countdown
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start countdown
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
