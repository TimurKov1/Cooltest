import classnames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { TestContext } from '../../context/TestContext'
import styles from './styles.module.css'

export function TestQuestionWrite({id, text, type, answers, rightAnswer, flag, className}) {
    const test = useContext(TestContext)

    const inputHandler = event => {
        let question = test.answers
        answers.forEach(item => {
            question[id] = {answers: [{text: event.target.value, isRight: event.target.value.toLowerCase() === item.text.toLowerCase()}], type: 'write'}
        })
        test.setAnswers({...question})
    }

    return (
        <div className={classnames(styles.question, className)}>
            <p className={styles.question__text}>{text}</p>
            <h3 className={styles.question__title}>Введите правильный ответ:</h3>
            {
                answers.map((item, key) => (
                    <div className={styles.question__write} key={key}>
                        <h3 className={styles.question__answer}>Ответ:</h3>
                        { 
                            !flag ? 
                                <input type="text" className={styles.question__input_answer} onChange={inputHandler} value={test.answers[id] ? test.answers[id].answers[0].text : ''}/> 
                            : 
                                rightAnswer.answer === rightAnswer.rightAnswer ?
                                    <input type="text" className={classnames(styles.question__input_answer, styles.green)} value={rightAnswer.answer} disabled/>
                                :
                                    <input type="text" className={classnames(styles.question__input_answer, styles.red)} value={rightAnswer.answer} disabled/>
                        }
                    </div>
                ))
            }
        </div>
    )
}