const filmesIniciais = [
    { id: 1, titulo: "A Origem", ano: 2010, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=A+Origem", nota: 5, status: "assistido", comentario: "Revejo sempre." },
    { id: 2, titulo: "Parasita", ano: 2019, genero: "Suspense", poster: "https://placehold.co/200x300?text=Parasita", nota: 4, status: "assistido", comentario: "" },
    { id: 3, titulo: "O Auto da Compadecida", ano: 2000, genero: "Comédia", poster: "https://placehold.co/200x300?text=Compadecida", nota: 5, status: "assistido", comentario: "Classico nacional." },
    { id: 4, titulo: "Duna: Parte Dois", ano: 2024, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=Duna+2", nota: 4, status: "assistindo", comentario: "" },
    { id: 5, titulo: "Interestelar", ano: 2014, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=Interestelar", nota: 5, status: "quero", comentario: "" },
    { id: 6, titulo: "Cidade de Deus", ano: 2002, genero: "Drama", poster: "https://placehold.co/200x300?text=Cidade+de+Deus", nota: 4, status: "quero", comentario: "" }
];
function rotuloStatus(status) {
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assistir";
    return status; 
}
function criarCard(f) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = f.id;

    const img = document.createElement("img");
    img.src = f.poster || "https://placehold.co/200x300?text=Sem+Capa";
    img.alt = `Poster de ${f.titulo}`;

    const divStatus = document.createElement("div");
    divStatus.className = "status";
    const spanStatus = document.createElement("span");
    spanStatus.className = `badge badge-${f.status}`; 
    spanStatus.textContent = rotuloStatus(f.status);
    divStatus.appendChild(spanStatus);

    const titulo = document.createElement("h2");
    titulo.textContent = f.titulo;
    
    const anoGenero = document.createElement("p");
    anoGenero.textContent = `${f.ano} - ${f.genero}`;

    const pNota = document.createElement("p");
    pNota.textContent = `Nota: ${estrelas(f.nota)}`;

    const divAcoes = document.createElement("div");
    divAcoes.className = "edit-buttons";
    const btnEditar = document.createElement("button");
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";
    const btnRemover = document.createElement("button");
    btnRemover.className = "btn-remover";
    btnRemover.textContent = "Remover";
    divAcoes.append(btnEditar, btnRemover);

    const pComentario = document.createElement("p");
    pComentario.className = "comments";
    if (f.comentario) pComentario.textContent = f.comentario;

    card.append(img, divStatus, titulo, anoGenero, pNota, divAcoes, pComentario);
    return card;
}


function criaNotaSelecao(notaInicial = 0, aoMudar = () => {}){
    const TOTAL = 5;
    let notaAtual = notaInicial;

    const divNota = document.createElement("div");
    const labelNota = document.createElement("p");
    const estrelas = [];
    


    divNota.className = "area-nota";
    divNota.style.display = "flex";
    divNota.style.gap = "10px";
    divNota.setAttribute("role","radiogroup");
    divNota.classList.add("estrelas");

    labelNota.className = "label";
    labelNota.textContent ="Nota:";

    nota.append(labelNota)

    const pintar = (ate) => {
        estrela.forEach((btn, i) => {
            btn.textContent = i < ate ? "☆" : "★";
            btn.classList.toggle("ativa", i < ate);
            btn.setAttribute("aria-checked", i + 1 === notaAtual);
        });
    }

    for (let i = 1; i <= TOTAL; i++){
        const estrela = document.createElement("button");
        estrela.className = "estrela";
        estrela.type = "button";
        estrela.setAttribute("role", "radio");

        estrela.addEventListener("mouseenter", () => pintar(i))
        estrela.addEventListener("focus", () => pintar(i))
        estrela.addEventListener("mouseenter", () => {
            notaAtual = notaAtual === 1 ? 0 : i;
            pintar(notaAtual);
            aoMudar(notaAtual);
        })
        estrelas.push(estrelas);
        divNota.append(estrela);
    }

    divNota.addEventListener("mouseleave", () => pintar(notaAtual));
    divNota.addEventListener("focusout", () => pintar(notaAtual));

    pintar(notaAtual);
    return divNota;
}


function rotuloStatus(status){
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assisir";
    return status;
}


