import { ButtonSquared } from '../Button/ButtonSquared'
import { SimpleSelect } from '../SimpleSelect/SimpleSelect'
import styles from './styles.module.css'
import classnames from 'classnames'
import { ButtonBordered } from '../Button/ButtonBordered'
import { useContext, useState } from 'react'
import { QuestionsContext } from '../../context/QuestionsContext'

export function Sidebar() {
    const test = useContext(QuestionsContext)
    const [index, setIndex] = useState(1)
    const [value, setValue] = useState(null)

    function addQuestion(component) {
        const newData = [...test.questions, component]
        test.setQuestions(newData)
        setIndex(index + 1)
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__body}>
                <h2 className={styles.sidebar__title}>Добавить вопрос:</h2>
                <div className={styles.sidebar__buttons}>
                    <ButtonSquared text="Один ответ" func={() => {
                        addQuestion({index: index, name: `one-${index}`, type: 'one', text: '', answers: []})
                    }}/>
                    <ButtonSquared text="Несколько ответов" func={() => {
                        addQuestion({index: index, name: `several-${index}`, type: 'several', text: '', answers: []})
                    }}/>
                    <ButtonSquared text="Письменный ответ" func={() => {
                        addQuestion({index: index, name: `write-${index}`, type: 'write', text: '', answers: []})
                    }}/>
                </div>
                <div className={classnames(styles.main__group, styles.sidebar__group, styles.hide)}>
                    <SimpleSelect values={{
                        "one": "Один ответ", 
                        "several": "Несколько ответов", 
                        "match": "Соотношение", 
                        "write": "Письменный ответ"
                    }} func={setValue}/>
                    <ButtonBordered text="Добавить" className={styles.sidebar__button} func={() => {
                        addQuestion({index: index, type: value, name: `${value}-${index}`, text: '', answers: []})
                    }}/>
                </div>
            </div>
        </div>
    )
}