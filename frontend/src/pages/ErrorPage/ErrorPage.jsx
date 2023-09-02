import { Header } from "../../components/Layout/Header"
import { Layout } from "../../components/Layout/Layout"
import styles from "./styles.module.css"

export function ErrorPage({text}) {
    return (
        <Layout>
            <Header page={true}/>
            <main className={styles.main}>
                <div className={styles.main__body}>
                    <h1 className={styles.title}>{text}</h1>
                </div>
            </main>
        </Layout>
    )
}