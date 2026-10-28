const CHAVE_STORAGE = "cinetrack:filmes";
const btnTema   = document.querySelector("#btn-tema");
const iconeTema = document.querySelector("#icone-tema");
const POSTER_PADRAO = "https://placehold.co/200x300?text=Sem+Capa";
const ANO_MIN = 1888;
const ANO_MAX = 2030;

const GENEROS = {
    romance:   "Romance",
    ficcao:    "Ficção científica",
    drama:     "Drama",
    comedia:   "Comédia",
    terror:    "Terror",
    animacao:  "Animação",
    suspense:  "Suspense",
};

const STATUS = {
    assistido:  "Assistido",
    assistindo: "Assistindo",
    quero:      "Quero assistir",
};

const filmesIniciais = [
    { id: 1, titulo: "A Origem",              ano: 2010, genero: "ficcao",   poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg",  nota: 5, status: "assistido",  comentario: "Revejo sempre." },
    { id: 2, titulo: "Parasita",              ano: 2019, genero: "suspense", poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/bNGW8zYA91VqTZfV3jnKHPEKKvB.jpg",  nota: 4, status: "assistido",  comentario: "" },
    { id: 3, titulo: "O Auto da Compadecida", ano: 2000, genero: "comedia",  poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/y3IhuITELtprMhUd7bccu629rba.jpg",  nota: 5, status: "assistido",  comentario: "Clássico nacional." },
    { id: 4, titulo: "Duna: Parte Dois",      ano: 2024, genero: "ficcao",   poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/VMy4UGsI2u3f4fALGeCqCdsQBb.jpg",   nota: 4, status: "assistindo", comentario: "" },
    { id: 5, titulo: "Interestelar",          ano: 2014, genero: "ficcao",   poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/tR1XVa5bxgdh2bRw2u0DzrgkO2l.jpg",  nota: 5, status: "quero",      comentario: "" },
    { id: 6, titulo: "Cidade de Deus",        ano: 2002, genero: "drama",    poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/gfnXixcGC060QcG6JPxN6AMdVsq.jpg",  nota: 4, status: "quero",      comentario: "" },
];

let filmes = carregar();
let termoAtual = "";
let statusAtual = "todos";
let editandoId = null;

const listaEl      = document.querySelector("#lista");
const modalEl      = document.querySelector("#modal");
const cardModal    = document.querySelector(".card-adicionar");
const formEl       = document.querySelector("#form-filme");
const buscaEl      = document.querySelector("header input[type='search']");
const navFiltrosEl = document.querySelector("nav");
const btnAdicionar = document.querySelector("#btn-adicionar");
const btnCancelar  = document.querySelector("#bt-cancel");
const errosEl = criarAreaDeErros();

function debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

function estrelas(nota) {
    return "★".repeat(nota) + "☆".repeat(5 - nota);
}

function rotuloStatus(status) {
    return STATUS[status] ?? status;
}

function chaveGenero(valor) {
    if (valor in GENEROS) return valor;
    const normalizar = (s) => s.toLowerCase();
    return Object.keys(GENEROS).find(
        (k) => normalizar(GENEROS[k]) === normalizar(valor)
    ) ?? "";
}

function rotuloGenero(valor) {
    return GENEROS[chaveGenero(valor)] ?? valor;
}

function gerarId(lista) {
    return Math.max(0, ...lista.map((f) => f.id)) + 1;
}

function criarElemento(tag, { classe, texto, atributos } = {}) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    if (atributos) Object.entries(atributos).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
}

function carregar() {
    try {
        const txt = localStorage.getItem(CHAVE_STORAGE);
        return txt ? JSON.parse(txt) : [...filmesIniciais];
    } catch {
        return [...filmesIniciais];
    }
}

function salvar() {
    try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(filmes));
    } catch (erro) {
        console.error("Não foi possível salvar os filmes:", erro);
    }
}

function validarFilme(filme) {
    const erros = [];

    if (!filme.titulo || filme.titulo.trim() === "") {
        erros.push("O título é obrigatório.");
    }
    if (!Number.isInteger(filme.ano) || filme.ano < ANO_MIN || filme.ano > ANO_MAX) {
        erros.push(`Ano inválido (entre ${ANO_MIN} e ${ANO_MAX}).`);
    }
    if (!filme.nota) {
        erros.push("A nota é obrigatória.");
    }

    return { valido: erros.length === 0, erros };
}

function aplicarFiltros(lista, { termo, status }) {
    const busca = termo.trim().toLowerCase();
    return lista
        .filter((f) => f.titulo.toLowerCase().includes(busca))
        .filter((f) => status === "todos" || f.status === status);
}

function adicionarFilme(dados) {
    filmes = [...filmes, { ...dados, id: gerarId(filmes) }];
}

function editarFilme(id, dados) {
    filmes = filmes.map((f) => (f.id === id ? { ...f, ...dados, id } : f));
}

function removerFilme(id) {
    filmes = filmes.filter((f) => f.id !== id);
}

function formularioParaFilme(dados) {
    return {
        titulo:     dados.titulo.trim(),
        ano:        dados.ano,
        genero:     dados.genero,
        status:     dados.status,
        nota:       dados.nota,
        comentario: dados.comentario?.trim() || "",
        poster:     dados.url || POSTER_PADRAO,
    };
}

function criarCard(f) {
    const card = criarElemento("article", { classe: "card" });
    card.dataset.id = f.id;

    const img = criarElemento("img", {
        atributos: { src: f.poster || POSTER_PADRAO, alt: `Poster de ${f.titulo}` },
    });

    const divStatus = criarElemento("div", { classe: "status" });
    divStatus.append(
        criarElemento("span", {
            classe: `badge badge-${f.status}`,
            texto: rotuloStatus(f.status),
        })
    );

    const titulo    = criarElemento("h2", { texto: f.titulo });
    const anoGenero = criarElemento("p",  { texto: `${f.ano} - ${rotuloGenero(f.genero)}` });
    const pNota     = criarElemento("p",  { texto: `Nota: ${estrelas(f.nota)}` });

    const divAcoes = criarElemento("div", { classe: "edit-buttons" });
    divAcoes.append(
        criarElemento("button", { classe: "btn-editar",  texto: "Editar",  atributos: { type: "button" } }),
        criarElemento("button", { classe: "btn-remover", texto: "Remover", atributos: { type: "button" } })
    );

    const pComentario = criarElemento("p", { classe: "comments", texto: f.comentario || "" });

    card.append(img, divStatus, titulo, anoGenero, pNota, divAcoes, pComentario);
    return card;
}

function renderizarCards(listaDeFilmes) {
    const frag = document.createDocumentFragment();
    listaDeFilmes.forEach((f) => frag.appendChild(criarCard(f)));
    listaEl.replaceChildren(frag);
}

function atualizar() {
    const visiveis = aplicarFiltros(filmes, { termo: termoAtual, status: statusAtual });
    renderizarCards(visiveis);
}

function criarAreaDeErros() {
    const div = criarElemento("div", { classe: "form-erros" });
    div.setAttribute("role", "alert");
    div.style.cssText = "color: red; font-weight: bold; margin-bottom: 10px;";
    formEl.insertBefore(div, formEl.querySelector(".campo-titulo"));
    return div;
}

function mostrarErros(erros) {
    errosEl.replaceChildren(
        ...erros.flatMap((msg, i) =>
            i === 0 ? [document.createTextNode(msg)] : [document.createElement("br"), document.createTextNode(msg)]
        )
    );
}

function limparErros() {
    errosEl.replaceChildren();
}

function abrirModal()  { modalEl.hidden = false; }
function fecharModal() { modalEl.hidden = true; }

function abrirParaAdicionar() {
    editandoId = null;
    formEl.reset();
    limparErros();
    modalEl.classList.remove("modo-edicao");
    modalEl.querySelector("h2").textContent = "Adicione um filme!";
    abrirModal();
}

function abrirParaEditar(id) {
    const f = filmes.find((x) => x.id === id);
    if (!f) return;

    editandoId = id;
    modalEl.classList.add("modo-edicao");
    modalEl.querySelector("h2").textContent = "Altere seu card!";

    const campos = formEl.elements;
    campos.titulo.value     = f.titulo;
    campos.ano.value        = f.ano;
    campos.genero.value     = chaveGenero(f.genero);
    campos.status.value     = f.status;
    campos.nota.value       = f.nota;
    campos.comentario.value = f.comentario;
    campos.url.value        = f.poster === POSTER_PADRAO ? "" : f.poster;

    limparErros();
    abrirModal();
}

function aplicarTema(tema) {
    const claro = tema === "claro";
    document.documentElement.dataset.tema = tema;
    iconeTema.textContent = claro ? "dark_mode" : "light_mode";
    btnTema.setAttribute("aria-label", claro ? "Ativar modo escuro" : "Ativar modo claro");
}

function carregarTema() {
    try {
        return localStorage.getItem(CHAVE_TEMA) || "escuro";
    } catch {
        return "escuro";
    }
}

function alternarTema() {
    const novo = document.documentElement.dataset.tema === "claro" ? "escuro" : "claro";
    aplicarTema(novo);
    try {
        localStorage.setItem(CHAVE_TEMA, novo);
    } catch {}
}

btnAdicionar.addEventListener("click", abrirParaAdicionar);
btnCancelar.addEventListener("click", fecharModal);
btnTema.addEventListener("click", alternarTema);


document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalEl.hidden) fecharModal();
});

modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl) fecharModal();
});

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    limparErros();

    const dados = Object.fromEntries(new FormData(formEl));
    dados.ano  = Number(dados.ano);
    dados.nota = Number(dados.nota);

    const { valido, erros } = validarFilme(dados);
    if (!valido) {
        mostrarErros(erros);
        return;
    }

    const filme = formularioParaFilme(dados);

    if (editandoId !== null) {
        editarFilme(editandoId, filme);
    } else {
        adicionarFilme(filme);
    }

    salvar();
    formEl.reset();
    fecharModal();
    atualizar();
});

listaEl.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const id = Number(card.dataset.id);

    if (e.target.closest(".btn-remover")) {
        if (!confirm("Remover este filme?")) return;
        removerFilme(id);
        salvar();
        atualizar();
        return;
    }

    if (e.target.closest(".btn-editar")) {
        abrirParaEditar(id);
    }
});

buscaEl.addEventListener(
    "input",
    debounce((e) => {
        termoAtual = e.target.value;
        atualizar();
    }, 300)
);cd

navFiltrosEl.addEventListener("click", (e) => {
    const botao = e.target.closest("button");
    if (!botao) return;
    
    navFiltrosEl.querySelector(".ativo")?.classList.remove("ativo");
    botao.classList.toggle("ativo");

    statusAtual = botao.dataset.status;
    atualizar();
});

aplicarTema(carregarTema());
atualizar();