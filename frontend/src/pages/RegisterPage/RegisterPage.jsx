import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { Circle } from "../../components/Circle/Circle"
import { Layout } from "../../components/Layout/Layout"
import { Registration } from "../../components/Registration/Registration"
import { AuthContext } from "../../context/AuthContext"
import styles from './styles.module.css'

export function RegisterPage() {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.isAuth) {
            return navigate('/profile')
        }
    }, [auth])

    return (
        <Layout className={styles.body}>
            <main className={styles.register}>
                <Circle/>
                <Registration/>
            </main>
        </Layout>
    )
}