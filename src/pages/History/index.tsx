import { useTask } from '../../context/TasksContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Task } from '../../reducers/tasks/reducer'

export function History() {
  const { tasks } = useTask()

  return (
    <HistoryContainer>
      <h1>My History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: Task) => {
              return (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.minutesAmount} min</td>
                  <td>
                    {formatDistanceToNow(new Date(task.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {task.finishedDate && (
                      <Status taskStatusColor="green">Finished</Status>
                    )}
                    {task.interruptedDate && (
                      <Status taskStatusColor="red">Interrupted</Status>
                    )}
                    {!task.finishedDate && !task.interruptedDate && (
                      <Status taskStatusColor="yellow">In execution</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
