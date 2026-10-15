const filmesIniciais = [
    { id: 1, titulo: "A Origem", ano: 2010, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=A+Origem", nota: 5, status: "assistido", comentario: "Revejo sempre." },
    { id: 2, titulo: "Parasita", ano: 2019, genero: "Suspense", poster: "https://placehold.co/200x300?text=Parasita", nota: 4, status: "assistido", comentario: "" },
    { id: 3, titulo: "O Auto da Compadecida", ano: 2000, genero: "Comédia", poster: "https://placehold.co/200x300?text=Compadecida", nota: 5, status: "assistido", comentario: "Classico nacional." },
    { id: 4, titulo: "Duna: Parte Dois", ano: 2024, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=Duna+2", nota: 4, status: "assistindo", comentario: "" },
    { id: 5, titulo: "Interestelar", ano: 2014, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=Interestelar", nota: 5, status: "quero", comentario: "" },
    { id: 6, titulo: "Cidade de Deus", ano: 2002, genero: "Drama", poster: "https://placehold.co/200x300?text=Cidade+de+Deus", nota: 4, status: "quero", comentario: "" }
];

const CHAVE = "cinetrack:filmes";

function carregar() {
    const txt = localStorage.getItem(CHAVE);
    return txt ? JSON.parse(txt) : [...filmesIniciais];
}

const salvar = () => localStorage.setItem(CHAVE, JSON.stringify(filmes));

let filmes = carregar();

let termoAtual = "";
let statusAtual = "todos";

function rotuloStatus(status) {
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assistir";
    return status; 
}

const estrelas = (nota) => {
    let resultado = "";
    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? "★" : "☆";
    }
    return resultado;
};

function validarFilme(filme) {
    const erros = [];
    if (!filme.titulo || filme.titulo.trim() === "") erros.push("O título é obrigatório.");
    if (filme.ano < 1888 || filme.ano > 2030) erros.push("Ano inválido (entre 1888 e 2030).");
    if (!filme.nota) erros.push("A nota é obrigatória.");
    return { valido: erros.length === 0, erros };
}

const gerarId = (lista) => 
    Math.max(0, ...lista.map((f) => f.id)) + 1;

function aplicarFiltros(lista, opcoes) {
    const termo = opcoes.termo.toLowerCase();
    return lista
        .filter((f) => f.titulo.toLowerCase().includes(termo))
        .filter((f) => opcoes.status === "todos" || f.status === opcoes.status);
}

const lista = document.querySelector("#lista");

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

function renderizarCards(listaDeFilmes) {
    const frag = document.createDocumentFragment();
    listaDeFilmes.forEach((f) => frag.appendChild(criarCard(f)));
    lista.replaceChildren(frag);
}

function atualizar() {
    const visiveis = aplicarFiltros(filmes, { termo: termoAtual, status: statusAtual });
    renderizarCards(visiveis);
}

const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
let editandoId = null;

const abrir = () => modal.hidden = false;
const fechar = () => modal.hidden = true;

document.querySelector("#btn-adicionar").addEventListener("click", () => {
    editandoId = null;
    form.reset();
    divErros.textContent = "";
    abrir();
});
document.querySelector("#bt-cancel").addEventListener("click", fechar);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) fechar();
});

const divErros = document.createElement("div");
divErros.style.color = "red";
divErros.style.fontWeight = "bold";
divErros.style.marginBottom = "10px";
form.insertBefore(divErros, form.querySelector(".campo-titulo"));

form.addEventListener("submit", (e) => {
    e.preventDefault();
    divErros.textContent = "";

    const dados = Object.fromEntries(new FormData(form));
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota);

    const { valido, erros } = validarFilme(dados);
    if (!valido) {
        divErros.innerHTML = erros.join("<br>");
        return;
    }

    const filmeProcessado = {
        titulo: dados.titulo, ano: dados.ano, genero: dados.genero,
        status: dados.status, nota: dados.nota, comentario: dados.comentario || "",
        poster: dados.url || "https://placehold.co/200x300?text=Sem+Capa"
    };

    if (editandoId !== null) {
        filmes = filmes.map((f) => f.id === editandoId ? { ...f, ...filmeProcessado, id: editandoId } : f);
    } else {
        filmes = [...filmes, { ...filmeProcessado, id: gerarId(filmes) }];
    }

    salvar();
    form.reset();
    fechar();
    atualizar();
});

lista.addEventListener("click", (e) => {
    const btnRemover = e.target.closest(".btn-remover");
    if (btnRemover) {
        if (!confirm("Remover este filme?")) return;
        const id = Number(btnRemover.closest(".card").dataset.id);
        filmes = filmes.filter((f) => f.id !== id);
        salvar();
        atualizar();
        return;
    }

    const btnEditar = e.target.closest(".btn-editar");
    if (btnEditar) {
        editandoId = Number(btnEditar.closest(".card").dataset.id);
        const f = filmes.find((x) => x.id === editandoId);
        form.elements.titulo.value = f.titulo; form.elements.ano.value = f.ano;
        form.elements.genero.value = f.genero; form.elements.status.value = f.status;
        form.elements.nota.value = f.nota; form.elements.comentario.value = f.comentario;
        form.elements.url.value = f.poster;
        divErros.textContent = "";
        abrir();
    }
});

function debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

const busca = document.querySelector("header input[type='search']");
const aoDigitar = (e) => {
    termoAtual = e.target.value;
    atualizar();
};
busca.addEventListener("input", debounce(aoDigitar, 300));

const navFiltros = document.querySelector("nav");
navFiltros.addEventListener("click", (e) => {
    const botao = e.target.closest("button");
    if (!botao) return;

    navFiltros.querySelector(".ativo").classList.remove("ativo");
    botao.classList.add("ativo");
    
    statusAtual = botao.dataset.status;
    atualizar();
});

atualizar();