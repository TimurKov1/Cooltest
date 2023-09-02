import { useState, useCallback, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import classnames from 'classnames'
import styles from './styles.module.css'
import { Grade } from '../Grade/Grade'

export function Grades({activeGrades, setActiveGrades}) {
    const [grades, setGrades] = useState(null)
    const {loading, error, request} = useHttp()

    const getGrades = useCallback(async () => {
        const gradesData = await request('/api/test/grades_all/', 'GET')
        setGrades(gradesData)
    }, [request])

    useEffect(() => {
        getGrades()
    }, [getGrades])

    if (loading || grades === null) {
        return
    }

    return <div className={styles.grades}>
        {
            grades.grades.map((item, key) => 
                <Grade id={item.id} key={key} name={item.name} activeGrades={activeGrades} setActiveGrades={setActiveGrades}/>
            )
        }
    </div>
} 