import { Tab } from '../Tab/Tab'
import styles from './styles.module.css'
import classnames from 'classnames'

export function Tabs({activeTab, setTab, text, className}) {
    return (
        <div className={styles.tabs}>
            <Tab text={text[0]} index={0} activeTab={activeTab} setTab={setTab} className={className}/>
            <span className={classnames(styles.tab__between, className)}>/</span>
            <Tab text={text[1]} index={1} activeTab={activeTab} setTab={setTab} className={className}/>
        </div>
    )
}