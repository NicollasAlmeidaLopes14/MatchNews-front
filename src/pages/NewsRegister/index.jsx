import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
    MdArrowBack,
    MdArticle,
    MdCheckCircle,
    MdLink,
    MdPersonOutline,
    MdPublish,
    MdTune,
} from 'react-icons/md'

import NewsRegisterForm from '../../components/NewsRegisterForm'
import FormField from '../../components/FormField'
import styles from './styles.module.css'
import { useState } from 'react'

const categoryOptions = [
    'MERCADO DA BOLA',
    'ENTREVISTA',
    'ANÁLISE TÁTICA',
    'CAMPEONATO NACIONAL',
    'CATEGORIAS DE BASE',
    'FUTEBOL EUROPEU',
]

function NewsRegister() {
    const [newsTitle, setNewsTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [newsContent, setNewsContent] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [source, setSource] = useState('');


    const navigate = useNavigate();

    const publicarNoticia = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/noticias", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    titulo: newsTitle,
                    resumo: summary,
                    texto: newsContent,
                    categoria: category,
                    autor: author,
                    fonte: source,
                })
            }
            )

            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);


            const dados = await response.json();
            toast.success("Notícia publicada com sucesso!")

            setTimeout(() => {
                navigate('/')
            }, 2000)

            return dados
        } catch (error) {
            console.error("Erro ao publicar a notícia: " + error)
            toast.error("Não foi possível publicar a notícia")
            return null
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await publicarNoticia()
    }

    return (
        <div className={styles.page}>
            <ToastContainer autoClose={3000} hideProgressBar />

            <header className={styles.header}>
                <Link className={styles.backLink} to="/">
                    <MdArrowBack aria-hidden="true" />
                    Voltar para as notícias
                </Link>

                <div className={styles.headingRow}>
                    <div>
                        <span className={styles.eyebrow}>MatchNews · Painel editorial</span>
                        <h1 className={styles.title}>Publicar nova notícia</h1>
                        <p className={styles.subtitle}>
                            Organize as informações da matéria antes de publicar para os leitores.
                        </p>
                    </div>

                    <div className={styles.statusBadge}>
                        <span className={styles.statusDot} />
                        Novo conteúdo
                    </div>
                </div>
            </header>

            <form className={styles.form} onSubmit={handleSubmit}>
                <main className={styles.mainColumn}>
                    <NewsRegisterForm
                        icon={<MdArticle aria-hidden="true" />}
                        title="Informações principais"
                        description="O título e o resumo são a primeira impressão da sua notícia."
                    >
                        <div className={styles.fieldsGroup}>
                            <FormField
                                id="news-title"
                                label="Título da notícia"
                                placeholder="Ex.: Clube anuncia novo reforço para a temporada"
                                maxLength={120}
                                value={newsTitle}
                                onChange={(e) => setNewsTitle(e.target.value)}
                                required
                            />

                            <FormField
                                id="news-summary"
                                label="Resumo"
                                placeholder="Apresente o ponto principal da notícia em poucas linhas."
                                hint="Este texto poderá aparecer nos cards da notícia."
                                maxLength={240}
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                rows={4}
                                as="textarea"
                                required
                            />
                        </div>
                    </NewsRegisterForm>

                    <NewsRegisterForm
                        icon={<MdArticle aria-hidden="true" />}
                        title="Conteúdo da matéria"
                        description="Desenvolva os fatos com clareza e destaque as informações mais relevantes."
                    >
                        <FormField
                            id="news-content"
                            label="Texto da notícia"
                            placeholder="Escreva o corpo completo da notícia aqui..."
                            rows={13}
                            value={newsContent}
                            onChange={(e) => setNewsContent(e.target.value)}
                            as="textarea"
                            required
                        />
                    </NewsRegisterForm>
                </main>

                <aside className={styles.sidebar}>
                    <NewsRegisterForm
                        icon={<MdTune aria-hidden="true" />}
                        title="Dados editoriais"
                        description="Defina como a matéria será identificada."
                        compact
                    >
                        <div className={styles.fieldsGroup}>
                            <FormField
                                id="news-category"
                                label="Categoria"
                                as="select"
                                defaultValue=""
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
                                id="news-author"
                                label="Autor responsável"
                                placeholder="Ex.: Redação MatchNews"
                                icon={<MdPersonOutline aria-hidden="true" />}
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                            />
                        </div>
                    </NewsRegisterForm>

                    <NewsRegisterForm
                        icon={<MdLink aria-hidden="true" />}
                        title="Fonte da informação"
                        description="Registre a origem usada na apuração."
                        compact
                    >
                        <FormField
                            id="news-source"
                            label="Fonte ou referência"
                            placeholder="Ex.: Site oficial do clube"
                            hint="Pode ser o nome de um veículo, clube ou entrevistado."
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                        />
                    </NewsRegisterForm>
                </aside>

                <footer className={styles.actionBar}>
                    <div className={styles.actionHint}>
                        <MdCheckCircle aria-hidden="true" />
                        Os campos com * são obrigatórios
                    </div>

                    <div className={styles.actions}>
                        <Link className={styles.cancelButton} to="/">
                            Cancelar
                        </Link>

                        <button className={styles.publishButton} type="submit">
                            <MdPublish aria-hidden="true" />
                            Publicar notícia
                        </button>
                    </div>
                </footer>
            </form>
        </div>
    )
}

export default NewsRegister
