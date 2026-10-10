const listaFilmes = [];



function criarCard(f){
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = f.id;
    const titulo = document.createElement("h2");
    titulo.textContent = f.titulo;
    const imagem = document.createElement("img");
    imagem.src = f.imagem;
    const status = document.createElement("div");
    status.className = "status";
    const spanBadge = document.createElement("span");
    spanBadge.className = "badge badge-assistindo";
    status.appendChild(spanBadge);
    const genero = document.createElement("p")

    card.append(titulo);
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


