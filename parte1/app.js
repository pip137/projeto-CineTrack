const listaFilmes = [];



function criarCard(f){
    const card = document.createElement("article");
    card.className = card;
    card.dataset.id = f.id;
    const titulo = document.createElement("h2");
    titulo.textContent = f.titulo;
    const imagem = document.createElement("img");
    imagem.src = f.imagem;
    const status = document.createElement("")
    card.append(titulo);
}


function rotuloStatus(status){
    if ()
}


