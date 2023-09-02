import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export function useHttp(userLoading=true) {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(userLoading)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                if (data.errors) {
                    throw new Error(data.errors[0].msg || 'Что-то пошло не так')
                } else {
                    throw new Error(data.message || 'Что-то пошло не так')
                }
            }
            setTimeout(() => setLoading(false), 100)

            return data
        } catch (e) {
            if (auth.isAuth || userLoading) {
                setTimeout(() => setLoading(false), 100)
            } else {
                setTimeout(() => setLoading(false), 500)
            }
            setError(e.message)
            throw e
        }
    }, [])

    function clearError() {
        setError(null)
    }

    return {loading, request, error, clearError}
}