import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'


const App = () => {
 
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position='bottom-right' />
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App