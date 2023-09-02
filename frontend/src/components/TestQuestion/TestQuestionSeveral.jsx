import classnames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { TestContext } from '../../context/TestContext'
import styles from './styles.module.css'

export function TestQuestionSeveral({id, text, type, answers, rightAnswer, flag, className}) {
    const [ids, setIds] = useState([])
    const test = useContext(TestContext)

    const checkHandler = event => {
        let question = test.answers
        let count = 0
        if (event.target.checked) {
            answers.forEach(item => {
                if (item.isRight) {
                    count ++
                }
                if (item.id == event.target.value) {
                    if (question[id]) {
                        question[id].answers.push({id: item.id, isRight: item.isRight})
                    } else {
                        question[id] = {answers: [], type: 'several', count: 0} 
                        question[id].answers.push({id: item.id, isRight: item.isRight})
                    }
                }
            })
            question[id].count = count
            test.setAnswers({...question})
        } else {
            question[id].answers.forEach((item, index) => {
                if (item.id == event.target.value) {
                    question[id].answers.splice(index, 1)
                }
            })
            test.setAnswers({...question})
        }
    }

    useEffect(() => {
        let idData = []
        if (test.answers[id]) {
            test.answers[id].answers.forEach(item => {
                idData.push(item.id)
            })
            setIds(idData)
        }
    }, [test.answers])

    return (
        <div className={classnames(styles.question, className)}>
            <p className={styles.question__text}>{text}</p>
            <h3 className={styles.question__title}>Выберите правильные ответы:</h3>
            <ul>
                {
                    answers.map((item, key) => (
                        <li className={styles.question__radio} key={key}>
                            {
                                !flag ? 
                                    ids.indexOf(item.id) === -1 ?
                                        <input className={classnames(styles.question__input, styles.question__input_checkbox)} type="checkbox" name={`${type}-${id}-${key}`} onChange={checkHandler} value={item.id}/>
                                    :
                                        <input className={classnames(styles.question__input, styles.question__input_checkbox)} type="checkbox" name={`${type}-${id}-${key}`} onChange={checkHandler} value={item.id} checked/>
                                :
                                    rightAnswer.rightAnswer.indexOf(item.id) != -1 ?
                                        <input className={classnames(styles.question__input, styles.question__input_checkbox, styles.question__input_green)} type="checkbox" name={`${type}-${id}-${key}`} disabled/>
                                    :
                                        rightAnswer.answer.indexOf(item.id) != -1 ?
                                            <input className={classnames(styles.question__input, styles.question__input_checkbox, styles.question__input_red)} type="checkbox" name={`${type}-${id}-${key}`} disabled/>
                                        :
                                        <input className={classnames(styles.question__input, styles.question__input_checkbox)} type="checkbox" name={`${type}-${id}-${key}`} disabled/>
                            }
                            <label className={styles.question__label}>{item.text}</label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}