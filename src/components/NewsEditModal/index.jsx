import { useEffect, useRef } from 'react'
import { MdClose, MdEdit, MdSave } from 'react-icons/md'

import FormField from '../FormField'

import styles from './styles.module.css'

const categoryOptions = [
    'MERCADO DA BOLA',
    'ENTREVISTA',
    'ANÁLISE TÁTICA',
    'CAMPEONATO NACIONAL',
    'CATEGORIAS DE BASE',
    'FUTEBOL EUROPEU',
]

function NewsEditModal({ news, onClose, onSubmit }) {
    const closeButtonRef = useRef(null)

    useEffect(() => {
        if (!news) return undefined

        const previouslyFocusedElement = document.activeElement
        const previousBodyOverflow = document.body.style.overflow

        document.body.style.overflow = 'hidden'
        closeButtonRef.current?.focus()

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = previousBodyOverflow
            previouslyFocusedElement?.focus()
        }
    }, [news, onClose])

    if (!news) return null

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) onClose()
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const updatedNews = Object.fromEntries(new FormData(event.currentTarget))
        onSubmit?.(news.id, updatedNews)
    }

    return (
        <div className={styles.backdrop} onMouseDown={handleBackdropClick}>
            <section
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-news-modal-title"
            >
                <header className={styles.header}>
                    <div className={styles.heading}>
                        <span className={styles.headingIcon}>
                            <MdEdit aria-hidden="true" />
                        </span>

                        <div>
                            <span className={styles.eyebrow}>Painel editorial</span>
                            <h2 id="edit-news-modal-title">Editar notícia</h2>
                            <p>Revise as informações antes de salvar as alterações.</p>
                        </div>
                    </div>

                    <button
                        ref={closeButtonRef}
                        className={styles.closeButton}
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar edição da notícia"
                    >
                        <MdClose aria-hidden="true" />
                    </button>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.fields}>
                        <div className={styles.fullWidth}>
                            <FormField
                                id="edit-news-title"
                                name="titulo"
                                label="Título da notícia"
                                defaultValue={news.titulo ?? ''}
                                maxLength={120}
                                required
                            />
                        </div>

                        <div className={styles.fullWidth}>
                            <FormField
                                id="edit-news-summary"
                                name="resumo"
                                label="Resumo"
                                defaultValue={news.resumo ?? ''}
                                maxLength={240}
                                rows={3}
                                as="textarea"
                                required
                            />
                        </div>

                        <div className={styles.fullWidth}>
                            <FormField
                                id="edit-news-content"
                                name="texto"
                                label="Texto da notícia"
                                defaultValue={news.texto ?? ''}
                                rows={7}
                                as="textarea"
                                required
                            />
                        </div>

                        <FormField
                            id="edit-news-category"
                            name="categoria"
                            label="Categoria"
                            defaultValue={news.categoria ?? ''}
                            as="select"
                            required
                        >
                            <option value="" disabled>Selecione uma categoria</option>
                            {categoryOptions.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </FormField>

                        <FormField
                            id="edit-news-author"
                            name="autor"
                            label="Autor responsável"
                            defaultValue={news.autor ?? ''}
                            required
                        />

                        <div className={styles.fullWidth}>
                            <FormField
                                id="edit-news-source"
                                name="fonte"
                                label="Fonte ou referência"
                                defaultValue={news.fonte ?? ''}
                            />
                        </div>
                    </div>

                    <footer className={styles.footer}>
                        <button className={styles.cancelButton} type="button" onClick={onClose}>
                            Cancelar
                        </button>

                        <button className={styles.saveButton} type="submit">
                            <MdSave aria-hidden="true" />
                            Salvar alterações
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    )
}

export default NewsEditModal
