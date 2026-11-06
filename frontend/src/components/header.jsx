export default function Header({ busca, aoBuscar, aoAdicionar }) {
    return (
        <header>
            <div className="logo">
                <span className="material-symbols-outlined" id="animated_images">animated_images</span>
                <h1>Cine Track</h1>
            </div>
            
            <div className="search">
                <span className="material-symbols-outlined" id="search">search</span>
                <input type="search" aria-label="Buscar filme" placeholder="Busque um filme"
                    value={busca} onChange={(e) => aoBuscar(e.target.value)}/>
            </div>
            
            <button className="btn" onClick={aoAdicionar}>
                + Adicionar
            </button>
            
            <button className="btn" id="btn-tema" type="button" aria-label="Ativar modo claro">
                <span className="material-symbols-outlined" id="icone-tema">light_mode</span>
            </button>
        </header>
    );
}