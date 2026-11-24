# CineTrack

Gerenciador pessoal de filmes: cadastre, edite, filtre, busque e avalie os filmes que você já viu, está vendo ou quer ver.

Projeto da disciplina **Programação de Sistemas Web**, Universidade Estadual de Maringá (UEM).

## Funcionalidades

- Cadastrar, editar e remover filmes (título, ano, gênero, nota, status, comentário e pôster)
- Filtrar a lista por status: assistido, assistindo ou quero assistir
- Buscar pelo título (a lista filtra enquanto você digita)
- Avaliar com notas de 1 a 5 estrelas
- Tema claro e escuro
- Dados gravados no servidor, em um arquivo JSON

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React (Vite), CSS, Motion, React Icons |
| Backend | Node.js, Express, CORS, Morgan |
| Dados | Arquivo JSON (`backend/data/filmes.json`) |

## Arquitetura

```
Navegador (React, :5173)  <-- HTTP/JSON -->  API (Node + Express, :3000)  <-- fs -->  data/filmes.json
```

O frontend consome a API via `fetch`. O backend lê e grava os filmes em um arquivo JSON.

## Estrutura do repositório

```
.
├── frontend/              # Aplicação React (Vite)
│   └── src/
│       ├── api.js         # Chamadas fetch para a API
│       ├── App.jsx
│       └── components/
├── backend/               # API Node + Express
│   ├── server.js          # Servidor e rotas
│   ├── seed.js            # Gera o banco inicial (data/filmes.json)
│   ├── package.json
│   ├── .env.example       # Modelo das variáveis de ambiente
│   └── data/              # Criada pelo seed
└── README.md
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20.6 ou superior (os scripts usam `--env-file` e `--watch`)
- npm (já vem com o Node.js)

Para conferir a versão instalada:

```bash
node --version
```

## Como rodar o backend

Todos os comandos são executados dentro da pasta `backend/`.

```bash
cd backend
npm install
```

Crie o arquivo `.env` a partir do modelo:

```bash
# Windows (cmd)
copy .env.example .env

# Linux / macOS / Git Bash
cp .env.example .env
```

O conteúdo do `.env` é:

```
PORT=3000
```

Gere o banco inicial com os 6 filmes de exemplo:

```bash
npm run seed
```

Saída esperada: `6 filmes gravados`. O comando cria `data/filmes.json`.
Atenção: rodar o seed de novo **sobrescreve** o arquivo e apaga os filmes que você cadastrou.

Inicie o servidor:

```bash
npm run dev     # reinicia sozinho a cada arquivo salvo
# ou
npm start       # sem recarga automática
```

A API fica em `http://localhost:3000`. Para encerrar, use `Ctrl + C`.

### Scripts do backend

| Comando | O que faz |
| --- | --- |
| `npm run seed` | Grava `data/filmes.json` com os filmes iniciais |
| `npm run dev` | Sobe o servidor com recarga automática |
| `npm start` | Sobe o servidor sem recarga |

## Como rodar o frontend

Em **outro terminal**, com o backend já rodando:

```bash
cd frontend
npm install
npm run dev
```

Abra o endereço que o Vite mostrar no terminal (normalmente `http://localhost:5173`).

Para gerar o build de produção:

```bash
npm run build
```

Os arquivos otimizados ficam em `frontend/dist/`.

> O frontend espera a API em `http://localhost:3000`. Se mudar a porta no `.env`, ajuste a constante `BASE` em `frontend/src/api.js`.

## API

URL base: `http://localhost:3000`

| Método | Rota | Descrição | Respostas |
| --- | --- | --- | --- |
| GET | `/filmes` | Lista todos os filmes. Aceita `?status=` para filtrar | 200 |
| GET | `/filmes/:id` | Retorna um filme pelo id | 200, 404 |
| POST | `/filmes` | Cria um filme (corpo JSON) | 201, 400 |
| PUT | `/filmes/:id` | Atualiza um filme (o id é preservado) | 200, 404 |
| DELETE | `/filmes/:id` | Remove um filme | 204, 404 |

Respostas de erro têm o formato `{ "erro": "mensagem" }`.

### Exemplos

```bash
# listar
curl http://localhost:3000/filmes

# filtrar por status
curl "http://localhost:3000/filmes?status=quero"

# buscar um filme
curl http://localhost:3000/filmes/4
```

Corpo de exemplo para `POST /filmes` (cabeçalho `Content-Type: application/json`):

```json
{
  "titulo": "Tenet",
  "ano": 2020,
  "genero": "Ficção científica",
  "nota": 4,
  "status": "quero",
  "comentario": "Quero ver no fim de semana",
  "poster": ""
}
```

Apenas `titulo` e `ano` são obrigatórios. O `id` é gerado pelo servidor.

## Estrutura dos dados

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | Número | Gerado automaticamente |
| `titulo` | Texto | Obrigatório |
| `ano` | Número | Obrigatório |
| `genero` | Texto | Opcional |
| `nota` | Número | De 1 a 5 estrelas |
| `status` | Texto | `assistido`, `assistindo` ou `quero` |
| `comentario` | Texto | Opcional |
| `poster` | URL | Opcional; sem valor, o app mostra um espaço reservado |

## Variáveis de ambiente

| Variável | Padrão | Descrição |
| --- | --- | --- |
| `PORT` | `3000` | Porta em que a API escuta |

O arquivo `.env` não é versionado (está no `.gitignore`). Use o `.env.example` como modelo.

## Autores

- Henrique M. Neves da Silva (ra134557)
- Hiago A. Dantas Teixeira (ra139001)

Professor: Lucas de Oliveira Teixeira, Departamento de Informática, UEM.

---

CineTrack - UEM | Direitos © 2026