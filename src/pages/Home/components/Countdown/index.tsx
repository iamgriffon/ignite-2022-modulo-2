import { useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { useTask } from '../../../../context/TasksContext'

export function Countdown() {
  const {
    activeTask,
    activeTaskId,
    finishTask,
    minutesInSecondsPassed,
    setMinutesInSeconds,
  } = useTask()

  const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0
  const currentSeconds = activeTask ? totalSeconds - minutesInSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutesWithZero = String(minutesAmount).padStart(2, '0')
  const secondsWithZero = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number
    if (activeTask) {
      interval = setInterval(() => {
        const totalSecondsLeft = differenceInSeconds(
          new Date(),
          new Date(activeTask.startDate),
        )
        if (totalSecondsLeft >= totalSeconds) {
          finishTask()
          setMinutesInSeconds(totalSeconds)
          clearInterval(interval)
        } else {
          setMinutesInSeconds(totalSecondsLeft)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeTask, totalSeconds, activeTaskId, finishTask, setMinutesInSeconds])

  useEffect(() => {
    if (activeTask) document.title = `${minutesWithZero} : ${secondsWithZero}`
    else document.title = ''
  }, [activeTask, minutesWithZero, secondsWithZero])

  return (
    <CountdownContainer>
      <span>{minutesWithZero[0]}</span>
      <span>{minutesWithZero[1]}</span>
      <Separator>:</Separator>
      <span>{secondsWithZero[0]}</span>
      <span>{secondsWithZero[1]}</span>
    </CountdownContainer>
  )
}
