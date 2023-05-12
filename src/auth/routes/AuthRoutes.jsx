import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage, RecoveryPasswordPage, RegisterPage } from "../pages"


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={ <LoginPage/> } />
        <Route path="register" element={ <RegisterPage/> } />
        <Route path="/recovery" element={ <RecoveryPasswordPage/> } />
        
        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}
