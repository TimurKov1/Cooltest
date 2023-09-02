import styles from './styles.module.css'

export function QuestionsCount({questions}) {
    return (
        <div class={styles.questions}>
            <h3 class={styles.questions__text}>{questions[0]}</h3>
            <span class={styles.questions__between}>/</span>
            <h3 class={styles.questions__text}>{questions[1]}</h3>
        </div>
    )
}