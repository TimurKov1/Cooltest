import { useContext, useEffect } from 'react'
import { QuestionsContext } from '../../context/QuestionsContext'
import { QuestionOne } from '../Question/QuestionOne'
import { QuestionSeveral } from '../Question/QuestionSeveral'
import { QuestionWrite } from '../Question/QuestionsWrite'
import styles from './styles.module.css'

export function Questions() {
    const test = useContext(QuestionsContext)

    return (
        <div className={styles.questions}>
            {
                test.questions.map(item => (
                        item.type === 'one' ?
                            <QuestionOne index={item.index} key={item.index} name={item.name}/>
                        : item.type === 'several' ?
                            <QuestionSeveral index={item.index} key={item.index} name={item.name}/>
                        : 
                            <QuestionWrite index={item.index} key={item.index} name={item.name}/>
                    )
                )
            }
        </div>
    )
}