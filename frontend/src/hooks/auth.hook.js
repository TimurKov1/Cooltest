import { useCallback, useEffect, useState } from "react";

const storageName = 'userData'

export function useAuth() {
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')
    const [type, setType] = useState('')

    const login = useCallback((jwtToken, id, userType) => {
        setToken(jwtToken)
        setUserId(id)
        setType(userType)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, type: userType
        }))
    }, [])
    const logout = useCallback(() => {
        setToken('')
        setUserId('')
        setType('')
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.type)
        }
    }, [login])

    return {login, logout, token, userId, type}
}