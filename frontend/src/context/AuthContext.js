import { createContext } from "react"

function pass() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    type: null,
    login: pass,
    logout: pass,
    isAuth: false
})