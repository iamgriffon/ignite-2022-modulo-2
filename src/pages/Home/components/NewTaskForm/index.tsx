import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { TasksContext } from '../../../../context/TasksProvider'
import { useFormContext } from 'react-hook-form'

export function NewTaskForm() {
  const { activeTask } = useContext(TasksContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="">I will work</label>

      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Give it a name for your task"
        disabled={!!activeTask}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>
      <label htmlFor="">during</label>

      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        disabled={!!activeTask}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
