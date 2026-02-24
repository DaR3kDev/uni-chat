import { BrowserRouter } from 'react-router'
import MainRoutes from './app/router'

export function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  )
}
