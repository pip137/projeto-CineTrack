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
    card.append(titulo);
}


function rotuloStatus(status){
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assisir";
    return status;
}


