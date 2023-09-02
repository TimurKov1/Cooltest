import styles from './styles.module.css'
import left from '../../public/arrow_left.svg'
import right from '../../public/arrow_right.svg'
import leftWhite from '../../public/arrow_left_white.svg'
import rightWhite from '../../public/arrow_right_white.svg'
import classnames from 'classnames'
import { Timer } from '../Timer/Timer'
import { ButtonViolent } from '../Button/ButtonViolent'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { Loading } from '../Loading/Loading'
import { useNavigate } from 'react-router'
import { TestContext } from '../../context/TestContext'

export function Slider({id, name, time, count, flag, active, setActive}) {
    const test = useContext(TestContext)
    const auth = useContext(AuthContext)
    const {loading, error, request} = useHttp(false)
    const navigate = useNavigate()

    async function passHandler() {
        try {
            localStorage.removeItem(`test-${id}`)
            const data = await request('/api/test/pass', 'POST', {userId: auth.userId, testId: id, answers: test.answers, time: time, questions: count})
            if (!error) {
                test.setAnswers({})
                navigate('/profile')
            }
        } catch (e) {}
    }

    return (
        <div className={styles.slider}>
            {
                active === count - 1 && !flag ?
                    <ButtonViolent text="Сдать" func={passHandler} className={styles.button_small}/>
                : ''
            }
            <div className={styles.slider__content}>
                <button className={classnames(styles.slider__button, styles.slider__button_left, active === 0 ? styles.hide : '')} onClick={() => setActive(active - 1 >= 0 ? active - 1 : 0)}><img src={left} alt="Назад" className={classnames(styles.slider__arrow, styles.slider__arrow_default)}/><img src={leftWhite} alt="Назад" className={classnames(styles.slider__arrow, styles.slider__arrow_white)}/></button>
                <div className={styles.slider__body}>
                    <h1 className={styles.slider__text}>{name}</h1>
                    { !flag ? <Timer id={id} time={time} count={count} index={active} type="small"/> : "" }
                </div>
                <button className={classnames(styles.slider__button, styles.slider__button_right, active === count - 1 ? styles.hide : '')} onClick={() => setActive(active + 1 < count - 1 ? active + 1 : count - 1)}><img src={right} alt="Вперед" className={classnames(styles.slider__arrow, styles.slider__arrow_default)}/><img src={rightWhite} alt="Вперед" className={classnames(styles.slider__arrow, styles.slider__arrow_white)}/></button>
            </div>
        </div>
    )
}