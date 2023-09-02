import { ButtonPlus } from '../Button/ButtonPlus'
import { Number } from '../Number/Number'
import styles from './styles.module.css'
import classnames from 'classnames'
import { Answer } from '../Answer/Answer'
import { useContext, useEffect, useState } from 'react'
import { QuestionsContext } from '../../context/QuestionsContext'

export function QuestionSeveral({index, name}) {
    const test = useContext(QuestionsContext)
    const [answersData, setAnswersData] = useState([])

    function changeHandler(event) {
        const newQuestions = test.questions
        newQuestions[index - 1].text = event.target.value
        test.setQuestions([...newQuestions])
    }

    useEffect(() => {
        const newQuestions = test.questions
        newQuestions[index - 1].answers = answersData
        test.setQuestions([...newQuestions])
    }, [answersData])

    return (
        <article className={styles.question}>
            <Number index={index}/>
            <textarea className={classnames(styles.question__input, styles.question__textarea)} placeholder="Введите текст..." onChange={changeHandler}></textarea>
            <div className={styles.question__group}>
                <h3 className={styles.question__text}>Добавить вариант ответа</h3>
                <ButtonPlus func={setAnswersData} answers={answersData}/>
            </div>
            <div className={styles.answers}>
            {
                    answersData.map((item, key) => (
                        <Answer type="checkbox" name={`${name}-${key + 1}`} index={key} questionIndex={index} key={key}/>
                    ))
                }
            </div>
        </article>
    )
}