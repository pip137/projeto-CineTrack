const STATUS = [
    { valor: "todos", rotulo: "Todos" },
    { valor: "assistido", rotulo: "Assistido" },
    { valor: "assistindo", rotulo: "Assistindo" },
    { valor: "quero", rotulo: "Quero assistir" }
];

export default function Filtro() {
    return (
        <nav aria-label="Filtros de status">
            {STATUS.map((s) => (
                <button 
                    key={s.valor}
                    className={ativo === s.valor ? "ativo" : ""}
                    onClick={() => aoMudar(s.valor)}
                >
                    {s.rotulo}
                </button>
            ))}
        </nav>
    );
}