import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import AuthContext from './context/AuthContext'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'



const AppRouter = () => {
  const { isLogin, loading } = useContext(AuthContext)
  if (loading) return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <Header/>
      <FadeLoader color="#6366f1" />
      <Footer/>
    </div>
  )
  return (
    <Routes>
      {/* <Route element={<Layout></Layout>} > */}
      <Route path='/' element={isLogin ? <Home></Home> : <Navigate to="/login" />}></Route>
      <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
      <Route path='/login' element={<LoginPage></LoginPage>}></Route>
      {/* </Route> */}
    </Routes>
  )
}

export default AppRouter