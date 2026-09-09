import MainLayout from '@/Layout/MainLayout'
import { Routes, Route } from 'react-router'
import Home from '@/Pages/Home/Home'

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='home' element={<Home/>}/>
      </Route>
    </Routes>
  )
}

export default AppRouter