import { MdOutlineArticle } from 'react-icons/md'
import { useEffect, useState } from 'react'

import NewsListingCard from '../../components/NewsListingCard'
import NewsEditModal from '../../components/NewsEditModal'
import SiteHeader from '../../components/SiteHeader'

import tacticalAnalysisImage from '../../assets/analise-tatica.png'
import nationalFootballImage from '../../assets/futebol-nacional.png'
import europeanFootballImage from '../../assets/futebol-europeu.png'
import interviewImage from '../../assets/entrevista.png'
import transferImage from '../../assets/transferencias.png'
import youthFootballImage from '../../assets/futebol-base.png'

import styles from './styles.module.css'
import { toast, ToastContainer } from 'react-toastify'

const categoryImages = {
    'ANÁLISE TÁTICA': tacticalAnalysisImage,
    'MERCADO DA BOLA': transferImage,
    'FUTEBOL EUROPEU': europeanFootballImage,
    'CAMPEONATO NACIONAL': nationalFootballImage,
    'ENTREVISTA': interviewImage,
    'CATEGORIAS DE BASE': youthFootballImage
}

const getCategoryImage = (category) => {
    return categoryImages[category]
}

function NewsListing() {
    const [news, setNews] = useState([])
    const [newsBeingEdited, setNewsBeingEdited] = useState(null)

    useEffect(() => {
        const listarNoticias = async () => {
            try {
                const response = await fetch("http://localhost:8080/noticias")

                if (!response.ok) throw new Error(`Erro HTTP: ` + response.status);

                const dados = await response.json()
                setNews(dados)
            } catch (error) {
                console.error(`Erro ao listar notícias: ${error}`)
            }
        }
        listarNoticias()
    }, [])

    const atualizarNoticia = async (id, updatedNews) => {
        try {
            const response = await fetch(
                `http://localhost:8080/noticias/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(updatedNews)
            }
            )

            if (!response.ok) throw new Error("Erro HTTP: " + response.status);

            const updatedNewsFromBackend = await response.json()

            setNews((currentNews) =>
                currentNews.map((n) =>
                    n.id === id ? updatedNewsFromBackend : n
                )
            )

            setNewsBeingEdited(null)

            toast.success("Notícia atualizada com sucesso!")
            return updatedNewsFromBackend
        } catch (error) {
            console.error(`Erro ao editar notícia: ${error}`)
            toast.error("Não foi possível editar a notícia!")
            return
        }
    }

    const deletarNoticia = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/noticias/${id}`,
                {
                    method: "DELETE"
                }
            )

            if (!response.ok) throw new Error("Erro HTTP: " + response.status);


            const updatedNews = news.filter(n => n.id !== id)
            setNews(updatedNews);

            toast.success("Notícia deletada com sucesso!")
        } catch (error) {
            console.error("Erro ao deletar notícia", error)
            toast.error("Não foi possível deletar a notícia")
        }
    }

    return (
        <div className={styles.page}>
            <SiteHeader />
            <ToastContainer autoClose={3000} hideProgressBar />

            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div>
                        <span className={styles.eyebrow}>Central de notícias</span>
                        <h1 className={styles.title}>O futebol em todos os ângulos</h1>
                        <p className={styles.subtitle}>
                            Acompanhe análises, bastidores e os principais acontecimentos do futebol nacional e internacional.
                        </p>
                    </div>

                    <div className={styles.totalBadge}>
                        <MdOutlineArticle aria-hidden="true" />
                        <div>
                            <strong>{news.length}</strong>
                            <span>notícias publicadas</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className={styles.content}>
                <div className={styles.sectionHeading}>
                    <div>
                        <span className={styles.sectionEyebrow}>Atualizações</span>
                        <h2>Notícias recentes</h2>
                    </div>

                    <span className={styles.resultCount}>{news.length} resultados</span>
                </div>

                <div className={styles.newsGrid}>
                    {!news.length &&
                        <div className={styles.emptyState} role="status" aria-live="polite">
                            <span className={styles.emptyStateIcon}>
                                <MdOutlineArticle aria-hidden="true" />
                            </span>
                            <h3>Nenhuma notícia publicada ainda</h3>
                            <p>Quando publicarmos as notícias, elas aparecerão aqui!</p>
                        </div>
                    }

                    {news.map((n) => (
                        <NewsListingCard
                            key={n.id}
                            title={n.titulo}
                            summary={n.resumo}
                            category={n.categoria}
                            author={n.autor}
                            publishedAt={n.dataPublicacao}
                            updatedAt={n.dataAtualizacao}
                            img={getCategoryImage(n.categoria)}
                            imgAlt={n.categoria}
                            featured={news[0] == n}
                            editar={() => setNewsBeingEdited(n)}
                            deletar={() => deletarNoticia(n.id)}
                        />
                    ))}
                </div>
            </main>

            <NewsEditModal
                news={newsBeingEdited}
                onClose={() => setNewsBeingEdited(null)}
                onSubmit={atualizarNoticia}
            />
        </div>
    )
}

export default NewsListing
