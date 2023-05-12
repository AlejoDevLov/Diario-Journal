import { Routes, Route, Navigate } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckAuth } from "../../ui/components/CheckAuth"
import { useCheckAuth } from "../hooks/useCheckAuth"


export const AppRouter = () => {

    const status = useCheckAuth();

    if ( status === 'checking' ) return <CheckAuth/>

    return(
        <Routes>

            {
                (status === 'autenticated')
                ? <Route path="/*" element={ <JournalRoutes/> } />
                : <Route path="/auth/*" element={ <AuthRoutes/> } />
            }

            <Route path="/*" element={ <Navigate to='/auth/login' /> } />

        </Routes>
    )
}