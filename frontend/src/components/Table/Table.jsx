import styles from './styles.module.css'
import classnames from 'classnames'
import { useContext, useState, useEffect, useCallback } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { Loading } from '../Loading/Loading'
import { Row } from '../Row/Row'
import { Link } from 'react-router-dom'

export function Table({className, path, params, headers, flag=false}) {
    const auth = useContext(AuthContext)
    const {loading, error, request} = useHttp()
    const [users, setUsers] = useState(null)

    const getUsers = useCallback(async () => {
        const usersData = await request(path, 'POST', params)
        setUsers(usersData)
    }, [request, params])

    useEffect(() => {
        getUsers()
    }, [getUsers, params])

    if (loading) {
        return <Loading className={styles.loading}/>
    }

    if (users.users.length === 0) {
        return "Пока никто не сдал этот тест"
    }

    return (
        <table className={classnames(styles.table, className)}>
            <thead>
                <tr>
                    {
                        headers.map((item, key) => (
                            <th key={key} className={styles.table__head}>{item}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    users.users.map((user, key) => (
                        flag ? <Link className={styles.link} to={`/result/${params.id}/${user[0]}`}><Row key={key} index={key + 1} data={user}/></Link> : <Row key={key} index={key + 1} data={user}/>
                    ))
                }
            </tbody>
        </table>
    )
}