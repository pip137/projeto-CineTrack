<div align="center">

# 🎬 CineTrack

**Seu gerenciador pessoal de filmes.**
Organize sua lista, filtre por status e dê nota para o que você assistiu.

![HTML5](https://img.shields.io/badge/HTML5-bd1e1e?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-124e78?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f2bb05?style=for-the-badge&logo=javascript&logoColor=black)
![Sem dependências](https://img.shields.io/badge/depend%C3%AAncias-zero-a100f2?style=for-the-badge)

</div>

---

##  Sobre o projeto

O **CineTrack** foi desenvolvido como trabalho da disciplina de **Programação de Sistemas Web** da **UEM** (Universidade Estadual de Maringá).

É uma aplicação 100% front-end, sem backend e sem bibliotecas externas: tudo roda no navegador e seus filmes ficam salvos no próprio dispositivo.

<!-- 📸 Dica: adicione um print da tela aqui
![Preview do CineTrack](./docs/preview.png)
-->

##  Funcionalidades

| | Recurso | Detalhes |
|---|---|---|
| ➕ | **Adicionar filmes** | Título, ano, gênero, status, nota, comentário e URL do pôster |
| ✏️ | **Editar** | Reabre o formulário já preenchido com os dados do filme |
| 🗑️ | **Remover** | Com confirmação antes de apagar |
| 🔎 | **Busca em tempo real** | Filtra pelo título, com *debounce* de 300 ms |
| 🏷️ | **Filtro por status** | Todos · Assistido · Assistindo · Quero assistir |
| ⭐ | **Notas de 1 a 5** | Exibidas como estrelas nos cards |
| 💾 | **Persistência** | Tudo salvo no `localStorage` |
| ✅ | **Validação** | Título obrigatório, ano entre 1888 e 2030 e nota obrigatória |
| 📱 | **Responsivo** | Grid de cards adaptável e modal otimizado para celular |
| ⌨️ | **Acessível** | `aria-label`, `aria-live`, foco visível e fechar o modal com `Esc` |

## 🛠️ Tecnologias

- **HTML5**: estrutura semântica das páginas
- **CSS3**: Grid, Flexbox, variáveis CSS, `clamp()` e *media queries*
- **JavaScript (ES6+)**: manipulação do DOM, `FormData`, `localStorage`, delegação de eventos e *debounce*
- **Google Fonts**: Raleway
- **Material Symbols**: ícones

##  Estrutura

```
cinetrack/
├── index.html              # Página principal (lista, filtros e modal)
├── app.js                  # Toda a lógica da aplicação
├── cinetrack-css/
│   └── style.css           # Estilos e responsividade
├── cinetrack-img/
│   └── uem-modelo-02.svg   # Logo da UEM
└── cinetrack-html/
    └── sobre.html          # Página "Sobre o CineTrack"
```

## ▶ Como rodar

Não precisa instalar nada.

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Entre na pasta
cd cinetrack

# 3. Abra o index.html no navegador
```

Ou, se preferir um servidor local:

```bash
npx serve .
# ou
python -m http.server 8000
```

##  Como funciona

1. **Estado**: a lista de filmes vive em um array (`filmes`). Na primeira visita ele é preenchido com 6 filmes de exemplo (`filmesIniciais`).
2. **Renderização**: `atualizar()` aplica os filtros (busca + status) e `renderizarCards()` recria os cards usando `DocumentFragment`.
3. **Persistência**: a cada adicionar, editar ou remover, a lista é gravada em `localStorage` na chave `cinetrack:filmes`.
4. **Eventos**: cliques em *Editar* e *Remover* usam **delegação de eventos** no container `#lista`, então funcionam mesmo em cards criados dinamicamente.

> 💡 Para resetar os dados de exemplo, rode `localStorage.removeItem("cinetrack:filmes")` no console do navegador e recarregue a página.

##  Ideias para o futuro

- [ ] Upload de pôster em vez de URL
- [ ] Ordenação por nota, ano ou título
- [ ] Filtro por gênero
- [ ] Exportar e importar a lista em JSON
- [ ] Tema claro/escuro
- [ ] Integração com uma API de filmes (ex.: TMDB)

## Autores

| Nome | RA |
|---|---|
| **Henrique M. Neves da Silva** | ra134557 |
| **Hiago A. Dantas Teixeira** | ra139001 |

---

<div align="center">

Feito com 💜 e muita pipoca na **UEM**
*Av. Colombo, 5790 · Jd. Universitário · Maringá, PR · CEP 87020-900*

CineTrack · UEM · © 2026

</div>