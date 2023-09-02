import classnames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { TestContext } from '../../context/TestContext'
import styles from './styles.module.css'

export function TestQuestionOne({id, text, type, answers, rightAnswer, flag, className}) {
    const test = useContext(TestContext)

    const radioHandler = event => {
        let question = test.answers
        answers.forEach(item => {
            if (item.id == event.target.value) {
                question[id] = {answers: [], type: 'one'}
                question[id].answers.push({id: item.id, isRight: item.isRight})
            }
        })
        test.setAnswers({...question})
    }

    return (
        <div className={classnames(styles.question, className)}>
            <p className={styles.question__text}>{text}</p>
            <h3 className={styles.question__title}>Выберите правильный ответ:</h3>
            <ul>
                {
                    answers.map((item, key) => (
                        <li className={styles.question__radio} key={key}>
                            {
                                !flag ? 
                                    <input className={styles.question__input} type="radio" name={`${type}-${id}`} value={item.id} onChange={radioHandler} checked={test.answers[id] ? test.answers[id].answers[0].id === item.id ? true : false : false}/>
                                : 
                                    rightAnswer.answer === rightAnswer.rightAnswer ?
                                        item.id === rightAnswer.answer ?
                                            <input className={classnames(styles.question__input, styles.question__input_green)} type="radio" name={`${type}-${id}`} disabled/>
                                        :
                                            <input className={styles.question__input} type="radio" name={`${type}-${id}`} disabled/>
                                    :
                                        item.id === rightAnswer.rightAnswer ?
                                            <input className={classnames(styles.question__input, styles.question__input_green)} type="radio" name={`${type}-${id}`} disabled/>
                                        :
                                            item.id === rightAnswer.answer ?
                                                <input className={classnames(styles.question__input, styles.question__input_red)} type="radio" name={`${type}-${id}`} disabled/>
                                            :
                                                <input className={styles.question__input} type="radio" name={`${type}-${id}`} disabled/>
                            }
                            <label className={styles.question__label}>{item.text}</label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}