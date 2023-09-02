import { Answer } from '../Answer/Answer'
import classnames from 'classnames'
import { Number } from '../Number/Number'
import styles from './styles.module.css'
import { useContext, useEffect } from 'react'
import { QuestionsContext } from '../../context/QuestionsContext'

export function QuestionWrite({index, name}) {
    const test = useContext(QuestionsContext)

    function changeHandler(event) {
        const newQuestions = test.questions
        newQuestions[index - 1].text = event.target.value
        test.setQuestions([...newQuestions])
    }

    useEffect(() => {
        const newQuestions = test.questions
        newQuestions[index - 1].answers = [{text: '', isRight: true}]
        test.setQuestions([...newQuestions])
    }, [])

    return (
        <article className={styles.question}>
            <Number index={index}/>
            <textarea className={classnames(styles.question__input, styles.question__textarea)} placeholder="Введите текст..." onChange={changeHandler}></textarea>
            <Answer type="write" name={name} index={0} questionIndex={index}/>
        </article>
    )
}