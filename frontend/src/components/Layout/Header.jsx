import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Button } from '../Button/Button'
import { ButtonWhite } from '../Button/ButtonWhite'
import logo from '../../public/logo.svg'
import exit from '../../public/logout.png'
import styles from './styles.module.css'

export function Header({page=false}) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <header className={styles.header}>
            <Link to="/profile">
                <img className={styles.header__logo} src={logo} alt="Логотип"/>
            </Link>
            <ul className={styles.buttons}>
                {
                    auth.type === "student" && page ? <li><Link to="/profile"><Button className={styles.header__button} text="Профиль"/></Link></li> : ""
                }
                {
                    auth.type === "teacher" ? page ? <li><Link to="/profile"><Button className={styles.header__button} text="Профиль"/></Link></li> : <li><Link to="/create"><Button className={styles.header__button} text="Создать тест"/></Link></li> : ''
                }
                <li>
                    <ButtonWhite className={styles.header__button} text="Выйти" func={() => {
                        auth.logout()
                        navigate('/login')
                    }}/>
                    <button className={styles.button_image}><img className={styles.image} src={exit} alt="Выйти"/></button>
                </li>
            </ul>
        </header>
    )
}