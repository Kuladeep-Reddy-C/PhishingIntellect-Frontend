import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import DashBoardAdmin from "./pages/DashBoardAdmin"
import DashBoardUser from "./pages/DashBoardUser"
import Login from "./pages/Login"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard-admin" element={<DashBoardAdmin />} />
        <Route path="/dashboard-user" element={<DashBoardUser />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}