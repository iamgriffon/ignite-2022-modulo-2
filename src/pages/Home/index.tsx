import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewTaskForm } from './components/NewTaskForm'
import { Countdown } from './components/Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewTaskFormData, useTask } from '../../context/TasksContext'

const newTaskFormValidationSchema = zod.object({
  task: zod.string().min(5, 'Task name must have more than 5 characters'),
  minutesAmount: zod
    .number()
    .min(1, 'Task duration must be longer than 1 minute')
    .max(60, 'Task duration cannot be longer than 5 minutes'),
})

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
