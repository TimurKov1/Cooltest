import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import logo from '../../public/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useContext, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { Success } from '../Success/Success'
import { Loading } from '../Loading/Loading'
import { AuthContext } from '../../context/AuthContext'
import { Error } from '../Error/Error'

export function Login() {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const [status, setStatus] = useState(false)
    const {loading, error, request} = useHttp(false)

    async function loginHandler() {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            if (!error) {
                setStatus(true)
                auth.login(data.token, data.id, data.type)
                navigate('/profile')
            }
        } catch (e) {}
    }

    if (loading) {
        return <Loading/>
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <>
            <form action="#" className={styles.login__form}>
                <img src={logo} className={styles.login__logo} alt="Логотип"/>
                <div className={styles.login__body}>
                    <Input type="email" placeholder="E-mail" name="email" func={changeHandler}/>
                    <Input type="password" placeholder="Пароль" name="password" func={changeHandler}/>
                    <h4 className={styles.error}>{error}</h4>
                    <h3 className={styles.login__text}>Еще нет аккаунта? <Link to="/registration" className={styles.login__link}>Зарегистрироваться</Link></h3>
                    <Button text="Войти" className={styles.login__button} func={loginHandler}/>
                </div>
            </form>
        </>
    )
}