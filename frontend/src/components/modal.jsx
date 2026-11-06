import { useState } from "react";

// ==========================================
// ESTADO INICIAL E VALIDAÇÃO
// ==========================================
const VAZIO = {
    titulo: "", ano: "", genero: "", status: "", nota: "", comentario: "", poster: ""
};

// A função pura de validação (com a regra nova da nota!)
function validarFilme(filme) {
    const erros = [];
    if (!filme.titulo || filme.titulo.trim() === "") erros.push("O título é obrigatório.");
    if (filme.ano < 1888 || filme.ano > 2030) erros.push("Ano inválido (entre 1888 e 2030).");
    
    // Só exige nota se o status NÃO FOR "quero"
    if (filme.status !== "quero" && !filme.nota) {
        erros.push("A nota é obrigatória para filmes já vistos ou que está a ver.");
    }
    
    return { valido: erros.length === 0, erros };
}

export default function ModalFilme({ filme, aoSalvar, aoFechar }) {
    const [dados, setDados] = useState({
        ...VAZIO,
        ...filme
    });
    
    // Novo estado para guardar as mensagens de erro e mostrar no ecrã
    const [errosVisiveis, setErrosVisiveis] = useState([]);

    function atualizar(campo, valor) {
        setDados((anteriores) => ({
            ...anteriores,
            [campo]: valor
        }));
    }

    function submeter(evento) {
        evento.preventDefault();
        
        const filmeProcessado = {
            ...dados,
            ano: Number(dados.ano),
            nota: Number(dados.nota)
        };

        // Corre a validação antes de guardar
        const { valido, erros } = validarFilme(filmeProcessado);
        
        if (!valido) {
            setErrosVisiveis(erros); // Mostra os erros no ecrã
            return; // Interrompe o processo
        }
        
        setErrosVisiveis([]); // Limpa os erros se estiver tudo bem
        aoSalvar(filmeProcessado);
    }

    return (
        <div id="modal" className="modal-overlay">
            <div className="card-adicionar">
                <form className="formulario" id="form-filme" onSubmit={submeter}>
                    
                    <div className="title">
                        <span className="material-symbols-outlined" id="camera_roll">camera_roll</span>
                        <h2>{filme && filme.id ? "Editar Filme" : "Adicione um Filme!"}</h2>
                    </div>

                    {/* MOSTRA OS ERROS AQUI, A VERMELHO E SEM ALERT() */}
                    {errosVisiveis.length > 0 && (
                        <div style={{ color: "red", fontWeight: "bold", gridColumn: "1 / -1", margin: "0 0 10px 10px" }}>
                            {errosVisiveis.map((erro, i) => (
                                <p key={i}>• {erro}</p>
                            ))}
                        </div>
                    )}
                    
                    <div className="campo campo-titulo">
                        <label htmlFor="titulo">Título</label>
                        <input 
                            id="titulo" name="titulo" type="text" placeholder="Digite o título" required
                            value={dados.titulo} 
                            onChange={(e) => atualizar("titulo", e.target.value)}
                        />
                    </div>
                    
                    <div className="campo campo-ano">
                        <label htmlFor="ano">Ano</label>
                        <input 
                            id="ano" name="ano" type="number" min="1888" max="2030" placeholder="Ex: 2024" required
                            value={dados.ano} 
                            onChange={(e) => atualizar("ano", e.target.value)}
                        />
                    </div>
                    
                    <div className="campo campo-genero">
                        <label htmlFor="genero">Gênero</label>
                        <select 
                            id="genero" name="genero" required
                            value={dados.genero} 
                            onChange={(e) => atualizar("genero", e.target.value)}
                        >
                            <option value="" disabled>Escolha um gênero</option>
                            <option value="Ação">Ação</option>
                            <option value="Animação">Animação</option>
                            <option value="Comédia">Comédia</option>
                            <option value="Drama">Drama</option>
                            <option value="Fantasia">Fantasia</option>
                            <option value="Ficção científica">Ficção científica</option>
                            <option value="Romance">Romance</option>
                            <option value="Suspense">Suspense</option>
                            <option value="Suspense Psicológico">Suspense Psicológico</option>
                            <option value="Terror">Terror</option>
                        </select>
                    </div>
                    
                    <div className="campo campo-status">
                        <label htmlFor="status">Status</label>
                        <select 
                            id="status" name="status" required
                            value={dados.status} 
                            onChange={(e) => atualizar("status", e.target.value)}
                        >
                            <option value="" disabled>Escolha um status</option>
                            <option value="assistido">Assistido</option>
                            <option value="assistindo">Assistindo</option>
                            <option value="quero">Quero assistir</option>
                        </select>
                    </div>
                    
                    <fieldset className="campo campo-nota">
                        <legend style={{ color: "black" }}>Nota</legend>
                        {[1, 2, 3, 4, 5].map(num => (
                            <label key={num}>
                                <input 
                                    type="radio" name="nota" value={num} 
                                    required={dados.status !== "quero"}
                                    checked={Number(dados.nota) === num}
                                    onChange={(e) => atualizar("nota", e.target.value)}
                                /> {num}
                            </label>
                        ))}
                    </fieldset>
                    
                    <div className="campo campo-comentario">
                        <label htmlFor="comentario">Comentário</label>
                        <textarea 
                            id="comentario" name="comentario" rows="4" placeholder="Coloque um comentário"
                            value={dados.comentario} 
                            onChange={(e) => atualizar("comentario", e.target.value)}
                        ></textarea>
                    </div>
                    
                    <div className="campo campo-url">
                        <label htmlFor="url">URL do pôster</label>
                        <input 
                            id="url" name="url" type="url" placeholder="Insira a URL da capa do filme"
                            value={dados.poster} 
                            onChange={(e) => atualizar("poster", e.target.value)}
                        />
                    </div>
                    
                    <div className="campo campo-botoes">
                        <button type="submit" id="bt-save">Salvar</button>
                        <button type="button" id="bt-cancel" aria-label="Cancelar e voltar" onClick={aoFechar}>
                            <span className="material-symbols-outlined">cancel</span>
                        </button>
                    </div>
                </form>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7iJ6Qd17DsTxC4YeI8_F6tO_ZGTSCqN1HVA2j8NbtUQ&s=10" alt="Poster de Filmes" />
            </div>
        </div>
    );
}