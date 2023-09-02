import { useEffect } from 'react'
import styles from './styles.module.css'

export function Search({cards, setCards}) {
    const inputHandler = event => {
        let newCards = []
        cards.forEach(item => {
            let value = event.target.value.toLowerCase()
            let name = item.name.toLowerCase()
            if (name.includes(value)) {
                newCards.push(item)
            }
        })
        setCards([...newCards])
    }

    return (
        <input type="text" className={styles.search} placeholder="Поиск" onChange={inputHandler}/>
    )
}