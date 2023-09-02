import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import logo from '../../public/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useContext, useEffect, useState } from 'react'
import { Tabs } from '../Tabs/Tabs'
import { useHttp } from '../../hooks/http.hook'
import { Success } from '../Success/Success'
import { Loading } from '../Loading/Loading'
import { AuthContext } from '../../context/AuthContext'
import { Error } from '../Error/Error'

export function Registration() {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [activeTab, setTab] = useState(0)
    const [form, setForm] = useState({
        name: '',
        email: '',
        grade: '',
        subject: '',
        password: '',
        type: ''
    })
    const [status, setStatus] = useState(false)
    const {loading, error, request} = useHttp(false)

    async function registerHandler() {
        try {
            const data = await request('/api/auth/registration', 'POST', {...form})
            if (!error) {
                const user = await request('/api/auth/login', 'POST', {email: form.email, password: form.password})
                if (user) {
                    setStatus(true)
                    auth.login(user.token, user.id, user.type)
                    navigate('/profile')
                } else {
                    return <Error text="Что-то пошло не так! Попробуйте еще раз"/>
                }
            }
        } catch (e) {}
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        setForm({...form, "type": activeTab})
    }, [activeTab])

    return (
        <>
            {
                loading ? <Loading/> : ''
            }
            {
                status ? <Success text="Вы успешно зарегистрировались!"/> : ''
            }
            <form className={styles.register__form}>
                <img src={logo} className={styles.register__logo} alt="Логотип"/>
                <Tabs activeTab={activeTab} setTab={setTab} text={['Я ученик', 'Я учитель']}/>
                <div className={styles.register__body}>
                    <Input className={styles.register__input} type="text" placeholder="ФИО" name="name" func={changeHandler}/>
                    <div className={styles.register__group}>
                        <Input className={styles.register__input} type="email" placeholder="E-mail" name="email" func={changeHandler}/>
                        {
                            !activeTab ?
                            <Input className={styles.register__input} type="text" placeholder="Класс" name="grade" func={changeHandler}/> :
                            <Input className={styles.register__input} type="text" placeholder="Предмет" name="subject" func={changeHandler}/>
                        }
                    </div>
                    <Input className={styles.register__input} type="password" placeholder="Пароль" name="password" func={changeHandler}/>
                    <h4 className={styles.error}>{error}</h4>
                    <h3 className={styles.register__text}>Уже есть аккаунт? <Link to="/login" className={styles.register__link}>Войти</Link></h3>
                    <Button text="Зарегистрироваться" className={styles.register__button} func={registerHandler}/>
                </div>
            </form>
        </>
    )
}