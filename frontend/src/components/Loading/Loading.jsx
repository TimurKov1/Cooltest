import styles from './styles.module.css'
import loading from '../../public/loading.gif'
import classnames from 'classnames'

export function Loading({className}) {
    return (
        <div className={classnames(styles.loading, className)}>
            <img className={classnames(styles.loading__image, className ? styles.loading__image_small : '')} src={loading} alt="Загрузка..."/>
        </div>
    )
}