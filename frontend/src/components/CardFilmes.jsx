function estrelas(nota) {
    let resultado = "";
    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? "★" : "☆";
    }
    return resultado;
}

const ROTULOS = {
    assistido: "Assistido",
    assistindo: "Assistindo",
    quero: "Quero assistir"
};

export default function CardFilme({ filme, aoEditar, aoRemover }) {
    const imagemCapa = filme.poster || "https://placehold.co/200x300?text=Sem+Capa";

    return (
        <article className="card">
            <img src={imagemCapa} alt={`Poster de ${filme.titulo}`} />
            
            <div className="status">
                <span className={`badge badge-${filme.status}`}>
                    {ROTULOS[filme.status] || filme.status}
                </span>
            </div>
            
            <h2>{filme.titulo}</h2>
            
            <p>{filme.ano} - {filme.genero}</p>

            {filme.status !== "quero" && (
                <p>Nota: {estrelas(filme.nota)}</p>
            )}
            
            <div className="edit-buttons">
                <button 
                    className="btn-editar" 
                    onClick={() => aoEditar(filme)}
                >
                    Editar
                </button>
                <button 
                    className="btn-remover" 
                    onClick={() => aoRemover(filme.id)}
                >
                    Remover
                </button>
            </div>
            
            {filme.comentario && (
                <p className="comments">{filme.comentario}</p>
            )}
        </article>
    );
}