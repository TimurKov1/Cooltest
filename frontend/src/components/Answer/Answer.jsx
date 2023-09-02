import styles from './styles.module.css'
import classnames from 'classnames'
import { Input } from '../Input/Input'
import { useContext } from 'react'
import { QuestionsContext } from '../../context/QuestionsContext'

export function Answer({type, name, index, questionIndex}) {
    const test = useContext(QuestionsContext)

    function changeHandler(event) {
        const newQuestions = test.questions
        newQuestions[questionIndex - 1].answers[index].text = event.target.value
        test.setQuestions([...newQuestions])
    }

    function radioHandler(event) {
        const newQuestions = test.questions
        newQuestions[questionIndex - 1].answers.forEach(item => {
            item.isRight = false
        })
        newQuestions[questionIndex - 1].answers[index].isRight = true
        test.setQuestions([...newQuestions])
    }

    function checkHandler(event) {
        const newQuestions = test.questions
        newQuestions[questionIndex - 1].answers[index].isRight = true
        test.setQuestions([...newQuestions])
    }

    return (
        <div className={styles.answer}>
            <Input type="text" className={styles.answer__input} placeholder="Ответ..." func={changeHandler}/>
            {
                type === 'radio' ?
                    <div className={styles.answer__group}>
                        <Input type="radio" name={name} className={styles.answer__radio} func={radioHandler}/>
                        <label className={styles.answer__label}></label>
                    </div>
                : type === 'checkbox' ?
                    <div className={styles.answer__group}>
                        <Input type="checkbox" name={name} className={styles.answer__checkbox} func={checkHandler}/>
                        <label className={styles.answer__label}></label>
                    </div>
                : ''
            }
        </div>
    )
}