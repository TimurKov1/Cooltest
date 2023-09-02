import styles from './styles.module.css'
import classnames from 'classnames'

export function Tab({text, index, activeTab, setTab, className}) {
    return <button type="button" className={classnames(styles.tab, className, activeTab === index ? styles.tab_active : '')} onClick={() => setTab(index)}>{text}</button>
}