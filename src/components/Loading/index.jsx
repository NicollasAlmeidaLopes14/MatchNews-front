import styles from './styles.module.css'

function Loading({ message = 'Carregando...' }) {
    if (!message) return null

    return (
        <div
            className={styles.backdrop}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className={styles.content}>
                <span className={styles.spinner} aria-hidden="true" />
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Loading
