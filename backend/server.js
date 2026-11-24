const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const ARQUIVO =
    path.join(__dirname, "data", "filmes.json");

app.use(cors());
app.use(morgan("dev")); 
app.use(express.json());

app.listen(3000, () =>
console.log("API na porta 3000"));


function lerFilmes() {
    return JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));
}

function gerarId(lista) {
    const ids = lista.map((filme) => filme.id);
    return Math.max(0, ...ids) + 1;
}

function salvarFilmes(lista){
    fs.writeFileSync(ARQUIVO, JSON.stringify(lista,null,2));
}


app.get("/", (req, res) => {
    res.json({ ola: "CineTrack" });
});

app.get("/filmes", (req, res) => {
    let lista = lerFilmes();
    if (req.query.status)
        lista = lista.filter(f => f.status === req.query.status);
    res.json(lista);
});

app.get("/filmes/:id", (req, res) => {
    const id = Number(req.params.id);
    const filme = lerFilmes().find(f => f.id === id);

    if (!filme) return res.status(404).json({ erro: "Filme não encontrado" });
    
    res.json(filme);
});

app.post("/filmes", (req, res) => {
    const dados = req.body || {};

    if (!dados.titulo || !dados.ano) return res.status(400).json({ erro: "Dados obrigatórios" });

    const lista = lerFilmes();
    const novo = { id: gerarId(lista), ...dados };

    lista.push(novo);
    salvarFilmes(lista);
    res.status(201).json(novo);
});

app.put("/filmes/:id", (req, res) => {
    const id = Number(req.params.id);
    const lista = lerFilmes();
    const i = lista.findIndex(f => f.id === id);

    if (i === -1) return res.status(404).json({ erro: "Filme não encontrado" });
    
    // mantém o id, mesmo que o body traga outro
    lista[i] = { ...lista[i], ...req.body, id };
    salvarFilmes(lista);
    res.json(lista[i]);
});

app.delete("/filmes/:id", (req, res) => {
    const id = Number(req.params.id);
    const lista = lerFilmes();

    if (!lista.some(f => f.id === id)) return res.status(404).json({ erro: "Filme não encontrado" });
    
    salvarFilmes(lista.filter(f => f.id !== id));
    res.sendStatus(204); // sucesso, sem corpo
});

app.get("/tmdb/search", async (req, res) => {
    const q = req.query.q;
    if (!q) return res.status(400).json({ erro: "Informe o parâmetro q" });
    if (!process.env.TMDB_KEY) {
        return res.status(500).json({ erro: "TMDB_KEY não configurada" });
    }

    try {
        const url =
        "https://api.themoviedb.org/3/search/movie" +
        `?api_key=${process.env.TMDB_KEY}&language=pt-BR&query=${encodeURIComponent(q)}`;
        const r = await fetch(url);
        if (!r.ok) return res.status(502).json({ erro: "Falha ao consultar a TMDB" });

        const dados = await r.json();
        res.json(
        dados.results.map((f) => ({
            titulo: f.title,
            ano: Number((f.release_date || "").slice(0, 4)) || null,
            poster: f.poster_path
            ? `https://image.tmdb.org/t/p/w300_and_h450_face${f.poster_path}`
            : "",
        }))
        );
    } catch {
        res.status(502).json({ erro: "Falha ao consultar a TMDB" });
    }
});


