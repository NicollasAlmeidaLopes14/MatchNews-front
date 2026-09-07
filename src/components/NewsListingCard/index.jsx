import { MdAccessTime, MdDeleteOutline, MdEdit, MdPersonOutline } from 'react-icons/md'

import styles from './styles.module.css'

function NewsListingCard({
    category,
    img,
    imgAlt = '',
    publishedAt,
    updatedAt,
    author,
    title,
    summary,
    editar,
    deletar,
    featured = false,
}) {
    return (
        <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src={img} alt={imgAlt} />
                <span className={styles.categoryBadge}>{category}</span>

                <div className={styles.cardActions}>
                    <button
                        className={styles.editButton}
                        type="button"
                        onClick={editar}
                        aria-label={`Editar a notícia "${title}"`}
                    >
                        <MdEdit aria-hidden="true" />
                    </button>

                    <button
                        onClick={deletar}
                        className={styles.deleteButton}
                        type="button"
                        aria-label={`Excluir a notícia "${title}"`}
                    >
                        <MdDeleteOutline aria-hidden="true" />
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.metadata}>
                    <span>
                        <MdAccessTime aria-hidden="true" />
                        {
                            updatedAt != null ?
                                `Atualizado em: ${updatedAt}`
                                :
                                `Publicado em: ${publishedAt}`
                        }
                    </span>
                </div>

                <h3 className={styles.title}>{title}</h3>
                <p className={styles.summary}>{summary}</p>

                <div className={styles.author}>
                    <span className={styles.authorIcon}>
                        <MdPersonOutline aria-hidden="true" />
                    </span>
                    <span>{author}</span>
                </div>
            </div>
        </article>
    )
}

export default NewsListingCard
