import { useState, useEffect} from "react";
import { filmesIniciais, gerarId } from "./data/filmes.js";

import Header from "./components/header.jsx";
import Filtros from "./components/filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/modal.jsx";
import Footer from "./components/footer.jsx";
import { listar, criar, atualizar, remover } from "./api";

export default function App() {
    const [filmes, setFilmes] = useState(filmesIniciais);
    const [busca, setBusca] = useState("");
    const [status, setStatus] = useState("todos");
    const [editando, setEditando] = useState(null);

    useEffect(() => {
    listar()
        .then(setFilmes)
        .catch(() => setErro(true))
        .finally(() => setCarregando(false));
    }, []);

    async function salvar(filme) {
        if (filme.id) {
            const at = await atualizar(filme.id, filme);
            setFilmes((fs) => fs.map((f) => (f.id === at.id ? at : f)));
        } else {
            const novo = await criar(filme);
            setFilmes((fs) => [...fs, novo]);
        }
    }

    async function removerFilme(id) {
        await remover(id);
        setFilmes((fs) => fs.filter((f) => f.id !== id));
    }

    const visiveis = filmes
        .filter((f) => status === "todos" || f.status === status)
        .filter((f) => f.titulo.toLowerCase().includes(busca.toLowerCase()));

        function adicionar(novoFilme) {
        setFilmes((anteriores) => [
            ...anteriores,
            { ...novoFilme, id: gerarId(anteriores) }
        ]);
    }

    function editar(id, alteracoes) {
        setFilmes((anteriores) => 
            anteriores.map((f) => f.id === id ? { ...f, ...alteracoes } : f)
        );
    }


    function salvar(dados) {
        if (editando && editando.id) {
            editar(editando.id, dados);
        } else {
            adicionar(dados);
        }
        setEditando(null);
    }

    return (
        <>
            <Header 
                busca={busca} 
                aoBuscar={setBusca} 
                aoAdicionar={() => setEditando({})}
            />
            
            <Filtros 
                ativo={status} 
                aoMudar={setStatus} 
            />
            
            <main>
                <ListaFilmes 
                    filmes={visiveis} 
                    aoEditar={setEditando}
                    aoRemover={removerFilme} 
                />
            </main>

            {editando !== null && (
                <ModalFilme 
                    filme={editando} 
                    aoSalvar={salvar} 
                    aoFechar={() => setEditando(null)} 
                />
            )}
        <Footer/>
        </>
    );
}