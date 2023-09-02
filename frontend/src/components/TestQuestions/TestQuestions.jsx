import { useContext, useEffect, useState } from 'react'
import { TestContext } from '../../context/TestContext'
import { Slider } from '../Slider/Slider'
import { TestQuestionOne } from '../TestQuestion/TestQuestionOne'
import { TestQuestionSeveral } from '../TestQuestion/TestQuestionSeveral'
import { TestQuestionWrite } from '../TestQuestion/TestQuestionWrite'
import styles from './styles.module.css'

export function TestQuestions({data, questions, flag=false, rightAnswers}) {
    const [active, setActive] = useState(0)
    const test = useContext(TestContext)

    useEffect(() => {
        if (!flag) {
            const localData = JSON.parse(localStorage.getItem(`test-${data.id}`))
            if (localData) {
                test.setAnswers({...localData.answers})
            }
        }
    }, [])
 
    useEffect(() => {
        if (!flag) {
            localStorage.setItem(`test-${data.id}`, JSON.stringify({
                answers: test.answers
            }))
        }
    }, [test.answers])

    return (
        <div className={styles.test__body}>
            {
                questions.map((item, key) => (
                    item.type === 'one' ?
                        <TestQuestionOne id={item.id} text={item.text} type={item.type} answers={item.answers} rightAnswer={flag ? rightAnswers ? rightAnswers.questions[parseInt(item.id)] : "" : false} key={key} flag={flag} className={active !== key ? styles.hide : ''}/>
                    :
                    item.type === 'several' ?
                        <TestQuestionSeveral id={item.id} text={item.text} type={item.type} answers={item.answers} rightAnswer={flag ? rightAnswers ? rightAnswers.questions[parseInt(item.id)] : "" : false} key={key} flag={flag} className={active !== key ? styles.hide : ''}/>
                    :
                        <TestQuestionWrite id={item.id} text={item.text} type={item.type} answers={item.answers} rightAnswer={flag ? rightAnswers ? rightAnswers.questions[parseInt(item.id)] : "" : false} key={key} flag={flag} className={active !== key ? styles.hide : ''}/>
                ))
            }
            <Slider id={data.id} name={data.name} time={data.time} count={parseInt(data.count)} flag={flag} active={active} setActive={setActive}/>
        </div>
    )
}