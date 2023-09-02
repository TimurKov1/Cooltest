import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading/Loading";
import { TestContext } from "./context/TestContext";

export function App() {
    const {login, logout, token, userId, type} = useAuth()
    const isAuth = !!token
    const routes = useRoutes()
    const [loading, setLoading] = useState(true)
    const [answers, setAnswers] = useState({})

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 100)
    }, [])

    return (
        <>
            {
                loading ? <Loading/> : ''
            }
            <AuthContext.Provider value={{
                token, userId, type, login, logout, isAuth
            }}>
                <TestContext.Provider value={{
                    answers, setAnswers
                }}>
                    <BrowserRouter>
                        {routes}
                    </BrowserRouter>
                </TestContext.Provider>
            </AuthContext.Provider>
        </>
    )
}