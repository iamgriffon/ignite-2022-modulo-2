import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/globals'
import { Router } from './components/Router'
import { BrowserRouter } from 'react-router-dom'
import { TaskProvider } from './context/TasksProvider'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <TaskProvider>
          <Router />
        </TaskProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
